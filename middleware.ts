import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect volunteer portal routes
  if (
    pathname.startsWith("/volunteer/dashboard") ||
    pathname.startsWith("/volunteer/schedule") ||
    pathname.startsWith("/volunteer/hours") ||
    pathname.startsWith("/volunteer/profile")
  ) {
    const session = request.cookies.get("volunteer_session");
    if (!session) {
      return NextResponse.redirect(new URL("/volunteer/login", request.url));
    }
  }

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    const session = request.cookies.get("admin_session");
    if (!session) {
      return NextResponse.redirect(new URL("/volunteer/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/volunteer/dashboard/:path*", "/volunteer/schedule/:path*", "/volunteer/hours/:path*", "/volunteer/profile/:path*", "/admin/:path*"],
};
