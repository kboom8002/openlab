import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/supabase/server", () => ({
  createSupabaseServerClient: async () => ({
    auth: {
      getUser: async () => ({ data: { user: null } }),
    },
    from: () => ({
      update: () => ({ eq: () => ({ eq: () => ({ error: null }) }) }),
      insert: () => ({ select: () => ({ single: async () => ({ data: { id: "test-id" }, error: null }) }) }),
    }),
    rpc: async () => ({
      data: [{ ai_score: 80, pairwise_score: 70, expert_score: 90, composite_score: 82.5 }],
      error: null,
    }),
  }),
}));

import { declareConflictAction, submitExpertReviewAction } from "@/server/actions/evaluation";
import { getCompositeEvaluationSummary } from "@/server/queries/evaluation";

const VALID_UUID = "550e8400-e29b-41d4-a716-446655440000";

describe("VS-05 Multi-layer Evaluation & Composite Engine Validation", () => {
  it("fails expert review submission when unauthenticated", async () => {
    const res = await submitExpertReviewAction({
      assignmentId: VALID_UUID,
      versionId: VALID_UUID,
      conflictDeclared: false,
      rubricScores: {
        problemReality: 12,
        userValue: 12,
        solutionFit: 16,
        feasibility: 16,
        pilotability: 12,
        scalability: 4,
        socialValueSafety: 8,
      },
      rationale: "전문가 충실한 평가 근거 테스트입니다.",
    });

    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.error.code).toBe("AUTH_SESSION_REQUIRED");
    }
  });

  it("fails conflict declaration when reason is too short", async () => {
    const res = await declareConflictAction({
      assignmentId: VALID_UUID,
      reason: "sh", // 2 characters (< 5)
    });

    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.error.code).toBe("INPUT_INVALID");
    }
  });

  it("correctly retrieves composite evaluation weights (25:25:50)", async () => {
    const res = await getCompositeEvaluationSummary(VALID_UUID);

    expect(res.error).toBeNull();
    expect(res.summary).not.toBeNull();
    if (res.summary) {
      expect(res.summary.weights).toEqual({ ai: 25, pairwise: 25, expert: 50 });
      expect(res.summary.compositeScore).toBe(82.5);
    }
  });
});
