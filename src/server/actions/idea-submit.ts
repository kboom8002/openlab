"use server";

import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requestId, type ActionResult } from "@/lib/result";

const submitInput = z.object({
  ideaId: z.string().uuid(),
  visibility: z.enum(["public", "anonymous", "evaluators_only", "private"]),
  authorOwnershipAcknowledged: z.literal(true, {
    message: "아이디어 소유권 보유 약관 동의가 필요합니다.",
  }),
  aiProcessingConsent: z.literal(true, {
    message: "AI 다층 검토 동의가 필요합니다.",
  }),
});

export async function submitIdeaAction(raw: unknown): Promise<ActionResult<{ submittedVersionId: string; versionNumber: number }>> {
  const rid = requestId();
  const input = submitInput.safeParse(raw);

  if (!input.success) {
    return {
      ok: false,
      error: { code: "INPUT_INVALID", message: input.error.issues[0]?.message || "제출 약관 및 필수 옵션을 확인해 주세요.", retryable: false },
      meta: { requestId: rid },
    };
  }

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return {
      ok: false,
      error: { code: "AUTH_SESSION_REQUIRED", message: "로그인이 필요합니다.", retryable: false },
      meta: { requestId: rid },
    };
  }

  const { data, error } = await supabase.rpc("submit_idea_version", {
    p_idea_id: input.data.ideaId,
    p_visibility: input.data.visibility,
    p_consent_versions: {
      author_ownership_acknowledged: input.data.authorOwnershipAcknowledged,
      ai_processing_consent: input.data.aiProcessingConsent,
      submitted_at: new Date().toISOString(),
    },
  });

  if (error) {
    if (error.code === "40001") {
      return { ok: false, error: { code: "CONFLICT_STALE_DRAFT", message: "이미 제출된 아이디어입니다.", retryable: false }, meta: { requestId: rid } };
    }
    return { ok: false, error: { code: "INTERNAL_UNEXPECTED", message: error.message || "아이디어를 제출하지 못했습니다.", retryable: true }, meta: { requestId: rid } };
  }

  if (!data || !Array.isArray(data) || data.length === 0) {
    return { ok: false, error: { code: "INTERNAL_UNEXPECTED", message: "제출 버전을 생성하지 못했습니다.", retryable: true }, meta: { requestId: rid } };
  }

  const resultRow = data[0] as { submitted_version_id: string; version_number: number };

  return {
    ok: true,
    data: {
      submittedVersionId: resultRow.submitted_version_id,
      versionNumber: resultRow.version_number,
    },
    meta: { requestId: rid },
  };
}
