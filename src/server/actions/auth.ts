"use server";

import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requestId, type ActionResult } from "@/lib/result";

const signInSchema = z.object({
  email: z.string().trim().email("올바른 이메일 주소를 입력해주세요."),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
  next: z.string().optional(),
});

const signUpSchema = z.object({
  email: z.string().trim().email("올바른 이메일 주소를 입력해주세요."),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
  displayName: z.string().trim().min(1, "이름 또는 닉네임을 입력해주세요.").max(80),
});

export async function signInWithEmail(raw: unknown): Promise<ActionResult<{ redirectUrl: string }>> {
  const rid = requestId();
  const parsed = signInSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: { code: "INPUT_INVALID", message: parsed.error.issues[0]?.message || "입력값을 확인해 주세요.", retryable: false },
      meta: { requestId: rid },
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return {
      ok: false,
      error: { code: "AUTH_SESSION_REQUIRED", message: "이메일 또는 비밀번호가 일치하지 않습니다.", retryable: true },
      meta: { requestId: rid },
    };
  }

  const targetNext = parsed.data.next && parsed.data.next.startsWith("/") && !parsed.data.next.startsWith("//")
    ? parsed.data.next
    : "/challenges";

  return { ok: true, data: { redirectUrl: targetNext }, meta: { requestId: rid } };
}

export async function signUpWithEmail(raw: unknown): Promise<ActionResult<{ redirectUrl: string }>> {
  const rid = requestId();
  const parsed = signUpSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: { code: "INPUT_INVALID", message: parsed.error.issues[0]?.message || "입력값을 확인해 주세요.", retryable: false },
      meta: { requestId: rid },
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { display_name: parsed.data.displayName },
    },
  });

  if (error) {
    return {
      ok: false,
      error: { code: "INTERNAL_UNEXPECTED", message: error.message || "회원가입 처리 중 오류가 발생했습니다.", retryable: true },
      meta: { requestId: rid },
    };
  }

  return { ok: true, data: { redirectUrl: "/onboarding" }, meta: { requestId: rid } };
}
