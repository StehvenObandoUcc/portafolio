import { NextResponse, type NextRequest } from "next/server";
import { hasLocale, matchLocale } from "@/lib/i18n";

/**
 * - "/" redirects to /es, or to /en when the browser prefers English.
 * - Any other first segment that is not a locale gets a real 404
 *   (Cache Components renders unlisted params on demand otherwise).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const locale = matchLocale(request.headers.get("accept-language"));
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  const [first = ""] = pathname.split("/").filter(Boolean);
  if (!hasLocale(first)) {
    return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  // Skip API routes, Next internals and files with an extension.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
