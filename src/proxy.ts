import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { locales, type Locale } from "@/lib/i18n/config";

const AUTH_REQUIRED_PREFIXES = [
  "/onboarding",
  "/dashboard",
  "/my",
  "/ideas/new",
  "/profile",
  "/notifications",
  "/evaluate",
  "/expert",
  "/admin",
  "/sponsor",
];
const ANONYMOUS_ONLY_PATHS = ["/sign-in"];

export async function proxy(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const path = request.nextUrl.pathname;
  const langParam = request.nextUrl.searchParams.get("lang") as Locale | null;

  // Determine active locale from search param, path prefix, or cookie
  const segments = path.split("/").filter(Boolean);
  const firstSegment = segments[0] as Locale | undefined;

  let activeLocale: Locale | undefined;
  if (langParam && locales.includes(langParam)) {
    activeLocale = langParam;
  } else if (firstSegment && locales.includes(firstSegment)) {
    activeLocale = firstSegment;
  } else {
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value as Locale | undefined;
    if (cookieLocale && locales.includes(cookieLocale)) {
      activeLocale = cookieLocale;
    }
  }

  // 0. Route wellbcompany.ai / www.wellbcompany.ai directly to /company (and sub-paths)
  if (hostname.includes("wellbcompany.ai")) {
    if (path === "/") {
      const rewriteUrl = new URL("/company", request.url);
      if (activeLocale) rewriteUrl.searchParams.set("lang", activeLocale);
      const reqHeaders = new Headers(request.headers);
      if (activeLocale) reqHeaders.set("x-wellb-locale", activeLocale);

      const res = NextResponse.rewrite(rewriteUrl, {
        request: { headers: reqHeaders },
      });
      if (activeLocale) {
        res.cookies.set("NEXT_LOCALE", activeLocale, { path: "/", maxAge: 31536000, sameSite: "lax" });
      }
      return res;
    }

    if (
      !path.startsWith("/company") &&
      !path.startsWith("/_next") &&
      !path.startsWith("/api") &&
      !path.startsWith("/images") &&
      !path.includes(".")
    ) {
      if (firstSegment && locales.includes(firstSegment)) {
        // e.g. /en/about -> /company/about with ?lang=en
        const subPath = segments.slice(1).join("/");
        const rewriteUrl = new URL(`/company/${subPath}`, request.url);
        rewriteUrl.searchParams.set("lang", firstSegment);
        const reqHeaders = new Headers(request.headers);
        reqHeaders.set("x-wellb-locale", firstSegment);

        const res = NextResponse.rewrite(rewriteUrl, {
          request: { headers: reqHeaders },
        });
        res.cookies.set("NEXT_LOCALE", firstSegment, { path: "/", maxAge: 31536000, sameSite: "lax" });
        return res;
      }
      const rewriteUrl = new URL(`/company${path}`, request.url);
      if (activeLocale) rewriteUrl.searchParams.set("lang", activeLocale);
      const reqHeaders = new Headers(request.headers);
      if (activeLocale) reqHeaders.set("x-wellb-locale", activeLocale);

      const res = NextResponse.rewrite(rewriteUrl, {
        request: { headers: reqHeaders },
      });
      if (activeLocale) {
        res.cookies.set("NEXT_LOCALE", activeLocale, { path: "/", maxAge: 31536000, sameSite: "lax" });
      }
      return res;
    }
  }

  // Handle /en, /ja, /zh top-level path prefix on any host
  if (firstSegment && locales.includes(firstSegment)) {
    const subPath = segments.slice(1).join("/");
    const rewritePath = subPath ? (subPath.startsWith("company") ? `/${subPath}` : `/company/${subPath}`) : "/company";
    const rewriteUrl = new URL(rewritePath, request.url);
    rewriteUrl.searchParams.set("lang", firstSegment);
    const reqHeaders = new Headers(request.headers);
    reqHeaders.set("x-wellb-locale", firstSegment);

    const res = NextResponse.rewrite(rewriteUrl, {
      request: { headers: reqHeaders },
    });
    res.cookies.set("NEXT_LOCALE", firstSegment, { path: "/", maxAge: 31536000, sameSite: "lax" });
    return res;
  }

  // Forward request with x-wellb-locale header for server layout rendering
  const reqHeaders = new Headers(request.headers);
  if (activeLocale) {
    reqHeaders.set("x-wellb-locale", activeLocale);
  }

  let response = NextResponse.next({
    request: { headers: reqHeaders },
  });

  if (activeLocale && langParam) {
    response.cookies.set("NEXT_LOCALE", activeLocale, { path: "/", maxAge: 31536000, sameSite: "lax" });
  }

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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 1. Guard authenticated-only routes
  const requiresAuth = AUTH_REQUIRED_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`)
  );
  if (requiresAuth && !user) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("next", path);
    return NextResponse.redirect(signInUrl);
  }

  // 2. Redirect logged-in users away from /sign-in
  if (user && ANONYMOUS_ONLY_PATHS.includes(path)) {
    const nextPath = request.nextUrl.searchParams.get("next") || "/challenges";
    const safeNext =
      nextPath.startsWith("/") && !nextPath.startsWith("//") ? nextPath : "/challenges";
    return NextResponse.redirect(new URL(safeNext, request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
