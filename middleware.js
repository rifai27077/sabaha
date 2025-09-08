import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Kalau buka "/" → redirect ke /user
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/user", request.url));
  }

  // ✅ Biarkan /user dan semua sub-path nya bebas diakses
  if (pathname.startsWith("/user")) {
    return NextResponse.next();
  }

  // ✅ Semua path lain butuh token
  if (!token) {
    return NextResponse.redirect(new URL("/user/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|.*\\..*).*)"],
};
