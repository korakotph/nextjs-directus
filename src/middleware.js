import { NextResponse } from "next/server";

const DEFAULT_LANG = "th";
const SUPPORTED_LANGS = ["th", "en"];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // /
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(`/${DEFAULT_LANG}/home`, request.url)
    );
  }

  const segments = pathname.split("/").filter(Boolean);
  const lang = segments[0];

  // /th
  if (segments.length === 1 && SUPPORTED_LANGS.includes(lang)) {
    return NextResponse.redirect(
      new URL(`/${lang}/home`, request.url)
    );
  }

  // /abc หรือ lang ไม่รองรับ
  if (!SUPPORTED_LANGS.includes(lang)) {
    return NextResponse.redirect(
      new URL(`/${DEFAULT_LANG}/home`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
