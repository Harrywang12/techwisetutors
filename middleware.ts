import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "twt_session";

async function getRole(req: NextRequest): Promise<"ADMIN" | "VOLUNTEER" | null> {
  const secret = process.env.AUTH_SECRET;
  if (!secret) return null;
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    const role = payload.role;
    if (role === "ADMIN" || role === "VOLUNTEER") return role;
    return null;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminArea = pathname === "/admin" || pathname.startsWith("/admin/");
  const isAdminLogin = pathname === "/admin/login";

  const isVolunteerProtected =
    pathname === "/volunteer/dashboard" ||
    pathname.startsWith("/volunteer/dashboard/") ||
    pathname === "/volunteer/hours" ||
    pathname.startsWith("/volunteer/hours/") ||
    pathname === "/volunteer/schedule" ||
    pathname.startsWith("/volunteer/schedule/") ||
    pathname === "/volunteer/profile" ||
    pathname.startsWith("/volunteer/profile/");

  if (isAdminArea && !isAdminLogin) {
    const role = await getRole(req);
    if (role !== "ADMIN") {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  if (isVolunteerProtected) {
    const role = await getRole(req);
    if (!role) {
      const url = req.nextUrl.clone();
      url.pathname = "/volunteer/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/volunteer/:path*"],
};

