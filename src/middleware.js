import { NextResponse } from "next/server";

const DEFAULT_LANG = "th";
const ALLOWED_LANGS = ['th', 'en']

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

  // ข้าม static files
  if (
    pathname.startsWith('/img') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // /th
  if (lang && !ALLOWED_LANGS.includes(lang)) {
    return NextResponse.redirect(new URL('/th/home', request.url))
  }

  // /abc หรือ lang ไม่รองรับ
  if (pathname === '/th' || pathname === '/en') {
    return NextResponse.redirect(
      new URL(`/${lang}/home`, request.url)
    )
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
