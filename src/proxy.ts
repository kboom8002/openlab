import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const AUTH_REQUIRED_PREFIXES = [
  "/onboarding", "/dashboard", "/my", "/ideas/new",
  "/profile", "/notifications",
  "/evaluate", "/expert", "/admin", "/sponsor",
];
const ANONYMOUS_ONLY_PATHS = ["/sign-in"];

export async function proxy(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const path = request.nextUrl.pathname;

  // 0. Route wellbcompany.ai / www.wellbcompany.ai directly to /company (and sub-paths)
  if (hostname.includes("wellbcompany.ai")) {
    if (path === "/") {
      return NextResponse.rewrite(new URL("/company", request.url));
    }
    if (
      !path.startsWith("/company") &&
      !path.startsWith("/_next") &&
      !path.startsWith("/api") &&
      !path.startsWith("/images") &&
      !path.includes(".")
    ) {
      return NextResponse.rewrite(new URL(`/company${path}`, request.url));
    }
  }

  let response = NextResponse.next({ request });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return response;
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (items) => {
        items.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        items.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();

  // 1. Guard authenticated-only routes
  const requiresAuth = AUTH_REQUIRED_PREFIXES.some(prefix => path === prefix || path.startsWith(`${prefix}/`));
  if (requiresAuth && !user) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("next", path);
    return NextResponse.redirect(signInUrl);
  }

  // 2. Redirect logged-in users away from /sign-in
  if (user && ANONYMOUS_ONLY_PATHS.includes(path)) {
    const nextPath = request.nextUrl.searchParams.get("next") || "/challenges";
    const safeNext = nextPath.startsWith("/") && !nextPath.startsWith("//") ? nextPath : "/challenges";
    return NextResponse.redirect(new URL(safeNext, request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
