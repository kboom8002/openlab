import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/supabase/server", () => ({
  createSupabaseServerClient: async () => ({
    auth: {
      getUser: async () => ({ data: { user: null } }),
    },
    rpc: async () => ({ data: null, error: { code: "40001", message: "stale revision" } }),
  }),
}));

import { createIdeaDraft, updateWorkingPassportAction } from "@/server/actions/idea-draft";
import { getOwnIdeas } from "@/server/queries/ideas";

const VALID_UUID = "550e8400-e29b-41d4-a716-446655440000";

describe("VS-03 Idea Studio Actions & Queries Validation", () => {
  it("fails draft creation when unauthenticated", async () => {
    const res = await createIdeaDraft({
      challengeId: VALID_UUID,
      title: "Valid Idea Title",
    });
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.error.code).toBe("AUTH_SESSION_REQUIRED");
    }
  });

  it("fails passport update when user is unauthenticated", async () => {
    const res = await updateWorkingPassportAction({
      ideaId: VALID_UUID,
      passport: { identity: { title: "Test" } },
      expectedRevision: 0,
    });
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.error.code).toBe("AUTH_SESSION_REQUIRED");
    }
  });

  it("returns authentication error gracefully for getOwnIdeas when unauthenticated", async () => {
    const res = await getOwnIdeas();
    expect(res.ideas).toEqual([]);
    expect(res.error).toBe("로그인이 필요합니다.");
  });
});
