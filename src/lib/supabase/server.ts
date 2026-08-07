import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { serverEnv } from "@/lib/env/server";

export async function createSupabaseServerClient() {
  const jar = await cookies();
  const env = serverEnv();
  return createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll: () => jar.getAll(),
      setAll: (items) => { try { items.forEach(({ name, value, options }) => jar.set(name, value, options)); } catch { /* Server Component refreshes via middleware. */ } },
    },
  });
}
