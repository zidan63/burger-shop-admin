import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session/edge";

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();

  if (!req.nextUrl.pathname.startsWith("/login")) {
    const session = await getIronSession(req, res, {
      cookieName: "myapp_cookiename",
      password: {
        2: "another_password_at_least_32_characters_long",
        1: "complex_password_at_least_32_characters_long",
      },

      cookieOptions: {
        secure: process.env.NODE_ENV === "production",
      },
      ttl: 24 * 60 * 60,
    });

    const { accessToken } = session;

    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return res;
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
