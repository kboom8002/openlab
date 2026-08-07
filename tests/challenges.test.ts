import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/supabase/server", () => ({
  createSupabaseServerClient: async () => ({
    from: () => ({
      select: () => ({
        in: () => ({
          order: () => Promise.resolve({ data: [], error: null }),
          maybeSingle: () => Promise.resolve({ data: null, error: null }),
        }),
      }),
    }),
  }),
}));

import { getPublicChallenges, getChallengeBySlug } from "@/server/queries/challenges";

describe("Challenges Query Layer", () => {
  it("returns challenges array without throwing", async () => {
    const result = await getPublicChallenges("OPEN");
    expect(result).toHaveProperty("challenges");
    expect(result).toHaveProperty("error");
    expect(Array.isArray(result.challenges)).toBe(true);
  });

  it("handles non-existent challenge slug safely", async () => {
    const result = await getChallengeBySlug("non-existent-slug-123456");
    expect(result.challenge).toBeNull();
  });
});
