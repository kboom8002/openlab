"use server";

import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requestId, type ActionResult } from "@/lib/result";

const onboardingSchema = z.object({
  displayName: z.string().trim().min(1, "이름 또는 닉네임을 입력해 주세요.").max(80),
  bio: z.string().trim().max(300).optional(),
  interests: z.array(z.string()).default([]),
  accessibilityPreferences: z.object({
    reduced_motion: z.boolean().default(false),
    high_contrast: z.boolean().default(false),
  }).default({ reduced_motion: false, high_contrast: false }),
});

export async function completeOnboarding(raw: unknown): Promise<ActionResult<{ success: boolean }>> {
  const rid = requestId();
  const parsed = onboardingSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      ok: false,
      error: { code: "INPUT_INVALID", message: parsed.error.issues[0]?.message || "입력값을 확인해 주세요.", retryable: false },
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

  const { error } = await supabase.rpc("complete_user_onboarding", {
    p_display_name: parsed.data.displayName,
    p_bio: parsed.data.bio || "",
    p_interests: parsed.data.interests,
    p_accessibility_preferences: parsed.data.accessibilityPreferences,
  });

  if (error) {
    return {
      ok: false,
      error: { code: "INTERNAL_UNEXPECTED", message: "프로필 저장 중 오류가 발생했습니다.", retryable: true },
      meta: { requestId: rid },
    };
  }

  return { ok: true, data: { success: true }, meta: { requestId: rid } };
}
