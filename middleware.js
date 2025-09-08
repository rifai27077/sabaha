import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  // Jika belum ada token, arahkan ke /login
  if (!token && request.nextUrl.pathname !== "/user/login") {
    return NextResponse.redirect(new URL("/user/login", request.url));
  }

  return NextResponse.next();
}

// Tentukan path mana saja yang kena middleware
export const config = {
  matcher: ["/((?!_next|api|static|.*\\..*).*)"],
};
