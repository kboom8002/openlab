"use server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requestId, type ActionResult } from "@/lib/result";

const createInput = z.object({ challengeId: z.string().uuid(), title: z.string().trim().min(1).max(120) });
const updateInput = z.object({ ideaId: z.string().uuid(), title: z.string().trim().min(1).max(120), expectedRevision: z.number().int().nonnegative() });

const updatePassportInput = z.object({
  ideaId: z.string().uuid(),
  passport: z.record(z.string(), z.unknown()),
  expectedRevision: z.number().int().nonnegative(),
});

const sendMessageInput = z.object({
  conversationId: z.string().uuid(),
  content: z.string().trim().min(1, "메시지를 입력해 주세요."),
  stage: z.string().default("identity"),
});

const confirmSuggestionInput = z.object({
  messageId: z.string().uuid(),
  ideaId: z.string().uuid(),
  expectedRevision: z.number().int().nonnegative(),
  action: z.enum(["accepted", "rejected"]),
  fieldPath: z.string(),
  suggestedValue: z.unknown(),
  currentPassport: z.record(z.string(), z.unknown()),
});

export async function createIdeaDraft(raw: unknown): Promise<ActionResult<{ ideaId: string; revision: number }>> {
  const rid = requestId(); const input = createInput.safeParse(raw);
  if (!input.success) return { ok: false, error: { code: "INPUT_INVALID", message: "입력값을 확인해 주세요.", retryable: false }, meta: { requestId: rid } };
  const db = await createSupabaseServerClient(); const { data: { user } } = await db.auth.getUser();
  if (!user) return { ok: false, error: { code: "AUTH_SESSION_REQUIRED", message: "로그인이 필요합니다.", retryable: false }, meta: { requestId: rid } };
  
  const { data, error } = await db.rpc("create_idea_draft", { p_challenge_id: input.data.challengeId, p_title: input.data.title });
  if (error || !data || !Array.isArray(data) || data.length === 0) return { ok: false, error: { code: "INTERNAL_UNEXPECTED", message: "초안을 만들지 못했습니다.", retryable: false }, meta: { requestId: rid } };
  return { ok: true, data: { ideaId: (data[0] as { idea_id: string }).idea_id, revision: (data[0] as { revision: number }).revision }, meta: { requestId: rid } };
}

export async function updateIdeaDraft(raw: unknown): Promise<ActionResult<{ revision: number }>> {
  const rid = requestId(); const input = updateInput.safeParse(raw);
  if (!input.success) return { ok: false, error: { code: "INPUT_INVALID", message: "입력값을 확인해 주세요.", retryable: false }, meta: { requestId: rid } };
  const db = await createSupabaseServerClient(); const { data: { user } } = await db.auth.getUser();
  if (!user) return { ok: false, error: { code: "AUTH_SESSION_REQUIRED", message: "로그인이 필요합니다.", retryable: false }, meta: { requestId: rid } };
  
  const { data, error } = await db.rpc("update_idea_draft", { p_idea_id: input.data.ideaId, p_title: input.data.title, p_expected_revision: input.data.expectedRevision });
  if (error?.code === "40001") return { ok: false, error: { code: "CONFLICT_STALE_DRAFT", message: "다른 변경사항이 있습니다. 새로고침 후 다시 시도해 주세요.", retryable: true }, meta: { requestId: rid } };
  if (error || data == null) return { ok: false, error: { code: "ACCESS_OBJECT_NOT_FOUND", message: "대상을 찾을 수 없거나 접근 권한이 없습니다.", retryable: false }, meta: { requestId: rid } };
  return { ok: true, data: { revision: data as number }, meta: { requestId: rid } };
}

export async function updateWorkingPassportAction(raw: unknown): Promise<ActionResult<{ revision: number }>> {
  const rid = requestId();
  const input = updatePassportInput.safeParse(raw);
  if (!input.success) return { ok: false, error: { code: "INPUT_INVALID", message: "입력값을 확인해 주세요.", retryable: false }, meta: { requestId: rid } };

  const db = await createSupabaseServerClient();
  const { data: { user } } = await db.auth.getUser();
  if (!user) return { ok: false, error: { code: "AUTH_SESSION_REQUIRED", message: "로그인이 필요합니다.", retryable: false }, meta: { requestId: rid } };

  const { data, error } = await db.rpc("update_working_passport", {
    p_idea_id: input.data.ideaId,
    p_passport: input.data.passport,
    p_expected_revision: input.data.expectedRevision,
  });

  if (error?.code === "40001") {
    return { ok: false, error: { code: "CONFLICT_STALE_DRAFT", message: "다른 장치에서 수정되었습니다. 새로고침 후 시도해주세요.", retryable: true }, meta: { requestId: rid } };
  }
  if (error || data == null) {
    return { ok: false, error: { code: "ACCESS_OBJECT_NOT_FOUND", message: "아이디어를 찾을 수 없거나 수정 권한이 없습니다.", retryable: false }, meta: { requestId: rid } };
  }

  return { ok: true, data: { revision: data as number }, meta: { requestId: rid } };
}

export async function sendStudioMessageAction(raw: unknown): Promise<ActionResult<{ userMessageId: string; aiMessageId: string }>> {
  const rid = requestId();
  const input = sendMessageInput.safeParse(raw);
  if (!input.success) return { ok: false, error: { code: "INPUT_INVALID", message: "메시지를 입력해 주세요.", retryable: false }, meta: { requestId: rid } };

  const db = await createSupabaseServerClient();
  const { data: { user } } = await db.auth.getUser();
  if (!user) return { ok: false, error: { code: "AUTH_SESSION_REQUIRED", message: "로그인이 필요합니다.", retryable: false }, meta: { requestId: rid } };

  // 1. Insert user message
  const { data: userMsg, error: uErr } = await db
    .from("conversation_messages")
    .insert({
      conversation_id: input.data.conversationId,
      sender: "user",
      content: input.data.content,
    })
    .select("id")
    .single();

  if (uErr || !userMsg) {
    return { ok: false, error: { code: "INTERNAL_UNEXPECTED", message: "메시지를 전송하지 못했습니다.", retryable: true }, meta: { requestId: rid } };
  }

  // 2. Generate AI Coach Stub response with Suggestion (User confirmation required invariant)
  const aiContent = `💡 AI 코치 의견: "${input.data.content}" 관점에 대해 작성해주셨군요. 아래 제안 내용을 확인하고 Working Passport에 반영할지 선택하세요.`;
  const suggestionPayload = {
    stage: input.data.stage,
    suggested_field: `${input.data.stage}.context`,
    suggested_text: `${input.data.content} (AI 구조화 요약)`,
    rationale: "현장 문제와 직접 연계된 실증 가능 요소로 요약되었습니다.",
  };

  const { data: aiMsg, error: aErr } = await db
    .from("conversation_messages")
    .insert({
      conversation_id: input.data.conversationId,
      sender: "ai_coach",
      content: aiContent,
      suggestion_payload: suggestionPayload,
      suggestion_status: "pending",
    })
    .select("id")
    .single();

  if (aErr || !aiMsg) {
    return { ok: false, error: { code: "INTERNAL_UNEXPECTED", message: "AI 응답을 생성하지 못했습니다.", retryable: true }, meta: { requestId: rid } };
  }

  return { ok: true, data: { userMessageId: userMsg.id, aiMessageId: aiMsg.id }, meta: { requestId: rid } };
}

export async function confirmAiSuggestionAction(raw: unknown): Promise<ActionResult<{ revision?: number }>> {
  const rid = requestId();
  const input = confirmSuggestionInput.safeParse(raw);
  if (!input.success) return { ok: false, error: { code: "INPUT_INVALID", message: "잘못된 요청입니다.", retryable: false }, meta: { requestId: rid } };

  const db = await createSupabaseServerClient();
  const { data: { user } } = await db.auth.getUser();
  if (!user) return { ok: false, error: { code: "AUTH_SESSION_REQUIRED", message: "로그인이 필요합니다.", retryable: false }, meta: { requestId: rid } };

  // 1. Update suggestion status
  await db
    .from("conversation_messages")
    .update({ suggestion_status: input.data.action })
    .eq("id", input.data.messageId);

  // 2. If accepted, write to working passport with optimistic concurrency
  if (input.data.action === "accepted") {
    const [section, field] = input.data.fieldPath.split(".");
    const updatedPassport = { ...input.data.currentPassport };
    if (section && field) {
      const secObj = (updatedPassport[section] as Record<string, unknown>) || {};
      secObj[field] = input.data.suggestedValue;
      updatedPassport[section] = secObj;
    }

    const { data: revision, error } = await db.rpc("update_working_passport", {
      p_idea_id: input.data.ideaId,
      p_passport: updatedPassport,
      p_expected_revision: input.data.expectedRevision,
    });

    if (error || revision == null) {
      return { ok: false, error: { code: "CONFLICT_STALE_DRAFT", message: "Passport 반영 중 충돌이 발생했습니다.", retryable: true }, meta: { requestId: rid } };
    }

    return { ok: true, data: { revision: revision as number }, meta: { requestId: rid } };
  }

  return { ok: true, data: {}, meta: { requestId: rid } };
}
