import { describe, expect, it } from "vitest";
import { signInWithEmail, signUpWithEmail } from "@/server/actions/auth";
import { completeOnboarding } from "@/server/actions/onboarding";

describe("Auth Server Actions Validation", () => {
  it("fails sign-in when email format is invalid", async () => {
    const res = await signInWithEmail({ email: "invalid-email", password: "short" });
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.error.code).toBe("INPUT_INVALID");
    }
  });

  it("fails sign-up when display name is missing", async () => {
    const res = await signUpWithEmail({ email: "test@example.com", password: "password123", displayName: "" });
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.error.code).toBe("INPUT_INVALID");
    }
  });

  it("fails onboarding update when user is unauthenticated", async () => {
    const res = await completeOnboarding({ displayName: "Test User" });
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.error.code).toBe("AUTH_SESSION_REQUIRED");
    }
  });
});
