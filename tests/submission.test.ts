import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/supabase/server", () => ({
  createSupabaseServerClient: async () => ({
    auth: {
      getUser: async () => ({ data: { user: null } }),
    },
    rpc: async () => ({ data: null, error: { code: "40001", message: "stale" } }),
  }),
}));

import { submitIdeaAction } from "@/server/actions/idea-submit";
import { runPreflightAnalysis } from "@/server/queries/passport";
import type { WorkingPassport } from "@/server/queries/ideas";

const VALID_UUID = "550e8400-e29b-41d4-a716-446655440000";

describe("VS-04 Submission & Passport Immutability Validation", () => {
  it("rejects submission when consent checkboxes are not checked", async () => {
    const res = await submitIdeaAction({
      ideaId: VALID_UUID,
      visibility: "evaluators_only",
      authorOwnershipAcknowledged: false,
      aiProcessingConsent: true,
    });
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.error.code).toBe("INPUT_INVALID");
    }
  });

  it("fails submission when user is unauthenticated", async () => {
    const res = await submitIdeaAction({
      ideaId: VALID_UUID,
      visibility: "evaluators_only",
      authorOwnershipAcknowledged: true,
      aiProcessingConsent: true,
    });
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.error.code).toBe("AUTH_SESSION_REQUIRED");
    }
  });

  it("analyzes preflight completeness and identifies missing fields", () => {
    const incompletePassport: WorkingPassport = {
      identity: { title: "" },
    };
    const result = runPreflightAnalysis(incompletePassport);

    expect(result.isReady).toBe(false);
    expect(result.issues.length).toBeGreaterThan(0);
    expect(result.issues.some((i) => i.section === "identity")).toBe(true);
  });
});
