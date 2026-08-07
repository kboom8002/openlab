"use server";

import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requestId, type ActionResult } from "@/lib/result";

const conflictInput = z.object({
  assignmentId: z.string().uuid(),
  reason: z.string().trim().min(5, "이해상충 사유를 5자 이상 입력해 주세요."),
});

const submitReviewInput = z.object({
  assignmentId: z.string().uuid(),
  versionId: z.string().uuid(),
  conflictDeclared: z.literal(false, {
    message: "이해상충이 없음을 확인해야 평가를 제출할 수 있습니다.",
  }),
  rubricScores: z.object({
    problemReality: z.number().min(0).max(15),
    userValue: z.number().min(0).max(15),
    solutionFit: z.number().min(0).max(20),
    feasibility: z.number().min(0).max(20),
    pilotability: z.number().min(0).max(15),
    scalability: z.number().min(0).max(5),
    socialValueSafety: z.number().min(0).max(10),
  }),
  rationale: z.string().trim().min(10, "평가 정성 근거를 최소 10자 이상 입력해 주세요."),
});

const pairwiseInput = z.object({
  versionId: z.string().uuid(),
  winnerVersionId: z.string().uuid(),
  criteria: z.string().default("overall"),
});

export async function declareConflictAction(raw: unknown): Promise<ActionResult<{ success: boolean }>> {
  const rid = requestId();
  const input = conflictInput.safeParse(raw);

  if (!input.success) {
    return {
      ok: false,
      error: { code: "INPUT_INVALID", message: input.error.issues[0]?.message || "입력값을 확인해 주세요.", retryable: false },
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

  const { error } = await supabase
    .from("evaluator_assignments")
    .update({ status: "CONFLICT_DECLARED", updated_at: new Date().toISOString() })
    .eq("id", input.data.assignmentId)
    .eq("evaluator_id", user.id);

  if (error) {
    return { ok: false, error: { code: "INTERNAL_UNEXPECTED", message: "이해상충을 선언하지 못했습니다.", retryable: true }, meta: { requestId: rid } };
  }

  return { ok: true, data: { success: true }, meta: { requestId: rid } };
}

export async function submitExpertReviewAction(raw: unknown): Promise<ActionResult<{ evaluationId: string; score: number }>> {
  const rid = requestId();
  const input = submitReviewInput.safeParse(raw);

  if (!input.success) {
    return {
      ok: false,
      error: { code: "INPUT_INVALID", message: input.error.issues[0]?.message || "루브릭 항목 및 평가 근거를 확인해 주세요.", retryable: false },
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

  // Calculate total score from rubric components (Max 100)
  const r = input.data.rubricScores;
  const totalScore = r.problemReality + r.userValue + r.solutionFit + r.feasibility + r.pilotability + r.scalability + r.socialValueSafety;

  const { data: evalData, error: evalErr } = await supabase
    .from("evaluations")
    .insert({
      idea_version_id: input.data.versionId,
      evaluator_id: user.id,
      evaluation_type: "EXPERT",
      conflict_declared: false,
      score: totalScore,
      rubric_scores: r,
      rationale: input.data.rationale,
    })
    .select("id")
    .single();

  if (evalErr || !evalData) {
    return { ok: false, error: { code: "INTERNAL_UNEXPECTED", message: "평가 결과를 저장하지 못했습니다.", retryable: true }, meta: { requestId: rid } };
  }

  // Update assignment status to SUBMITTED
  await supabase
    .from("evaluator_assignments")
    .update({ status: "SUBMITTED", updated_at: new Date().toISOString() })
    .eq("id", input.data.assignmentId)
    .eq("evaluator_id", user.id);

  return { ok: true, data: { evaluationId: evalData.id, score: totalScore }, meta: { requestId: rid } };
}

export async function submitPairwiseVoteAction(raw: unknown): Promise<ActionResult<{ success: boolean }>> {
  const rid = requestId();
  const input = pairwiseInput.safeParse(raw);

  if (!input.success) {
    return {
      ok: false,
      error: { code: "INPUT_INVALID", message: "투표 정보를 확인해 주세요.", retryable: false },
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

  const isWinner = input.data.versionId === input.data.winnerVersionId;
  const score = isWinner ? 85 : 65;

  await supabase
    .from("evaluations")
    .insert({
      idea_version_id: input.data.versionId,
      evaluator_id: user.id,
      evaluation_type: "PAIRWISE",
      conflict_declared: false,
      score,
      rationale: `Pairwise comparison (${input.data.criteria})`,
    });

  return { ok: true, data: { success: true }, meta: { requestId: rid } };
}

const selectionDecisionInput = z.object({
  challengeId: z.string().uuid(),
  ideaVersionId: z.string().uuid(),
  decision: z.enum(["promising", "pilot_ready", "hold", "not_selected"], {
    message: "올바른 선발 결정을 선택해 주세요.",
  }),
  reason: z.string().trim().min(10, "선발 심의 사유를 최소 10자 이상 입력해 주세요."),
});

export async function recordSelectionDecisionAction(raw: unknown): Promise<ActionResult<{ decisionId: string }>> {
  const rid = requestId();
  const input = selectionDecisionInput.safeParse(raw);

  if (!input.success) {
    return {
      ok: false,
      error: {
        code: "INPUT_INVALID",
        message: input.error.issues[0]?.message || "입력값을 확인해 주세요.",
        retryable: false,
      },
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

  const { data, error } = await supabase
    .from("selection_decisions")
    .insert({
      challenge_id: input.data.challengeId,
      idea_version_id: input.data.ideaVersionId,
      decided_by: user.id,
      decision: input.data.decision,
      reason: input.data.reason,
      snapshot_data: { decided_by_user: user.id, timestamp: new Date().toISOString() },
    })
    .select("id")
    .single();

  if (error || !data) {
    return {
      ok: false,
      error: {
        code: "INTERNAL_UNEXPECTED",
        message: error?.message || "선발 결정을 기록하지 못했습니다.",
        retryable: true,
      },
      meta: { requestId: rid },
    };
  }

  // Update target idea status in DB based on decision
  let nextStatus: string | null = null;
  if (input.data.decision === "pilot_ready") nextStatus = "PILOT_READY";
  else if (input.data.decision === "promising") nextStatus = "PROMISING";

  if (nextStatus) {
    const { data: versionRow } = await supabase
      .from("idea_versions")
      .select("idea_id")
      .eq("id", input.data.ideaVersionId)
      .maybeSingle();

    if (versionRow?.idea_id) {
      await supabase
        .from("ideas")
        .update({ status: nextStatus, updated_at: new Date().toISOString() })
        .eq("id", versionRow.idea_id);
    }
  }

  return { ok: true, data: { decisionId: data.id }, meta: { requestId: rid } };
}

