import { Role } from "@prisma/client";
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const publicPaths = ["/", "/signin", "/signup", "/product"];

  // Check if the requested path is in the public paths
  const isPublicPath =
    publicPaths.includes(req.nextUrl.pathname) ||
    req.nextUrl.pathname.startsWith("/product");

  // Allow access to public paths
  if (isPublicPath) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token");
  let isAuthenticated = false;
  let isAdmin = false;
  let id = "";

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.SECRET || "secret");

      const { payload } = await jwtVerify<{ id: string; role: Role }>(
        token.value,
        secret,
      );

      isAuthenticated = true;
      isAdmin = payload.role === Role.ADMIN;
      id = payload.id;
    } catch (error) {
      console.error("Token verification failed:", error);
    }
  }

  if (isAuthenticated) {
    // If the user is authenticated and trying to access the profile path, redirect accordingly
    if (req.nextUrl.pathname.startsWith("/profile")) {
      if (isAdmin && !req.nextUrl.pathname.startsWith(`/profile/admin/${id}`)) {
        return NextResponse.redirect(new URL(`/profile/admin/${id}`, req.url));
      } else if (
        !isAdmin &&
        !req.nextUrl.pathname.startsWith(`/profile/user/${id}`)
      ) {
        return NextResponse.redirect(new URL(`/profile/user/${id}`, req.url));
      }
    }

    // Allow access to other paths if authenticated
    return NextResponse.next();
  }

  // If the user is not authenticated and the path is not public, redirect to the signin page
  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      has: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      has: [{ type: "header", key: "x-present" }],
      missing: [{ type: "header", key: "x-missing", value: "prefetch" }],
    },
  ],
};
