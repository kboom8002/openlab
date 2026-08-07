import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  } catch {
    // Ignore signout errors
  }

  return NextResponse.redirect(new URL("/sign-in", request.url), { status: 303 });
}
