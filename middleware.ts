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

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.SECRET || "secret");

      const { payload } = await jwtVerify<{ id: string; role: Role }>(
        token.value,
        secret,
      );

      isAuthenticated = true;
      isAdmin = payload.role === Role.ADMIN ? true : false;
    } catch (error) {
      console.error("Token verification failed:", error);
    }
  }

  // If the user is authenticated and is admin, allow access
  if (isAuthenticated && isAdmin) {
    return NextResponse.next();
  }

  // Check if the requested path is for admin access
  const isAdminPath = req.nextUrl.pathname.startsWith("/profile");

  // If the user is authenticated and the path is not admin-restricted, allow access
  if (isAuthenticated && !isAdmin && !isAdminPath) {
    return NextResponse.next();
  }

  // If the user is not an admin but is trying to access an admin-restricted path, redirect to the home page
  if (isAuthenticated && !isAdmin && isAdminPath) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If the user is not authenticated and the path is not public, redirect to the signin page
  return NextResponse.redirect(new URL("/signin", req.url));
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|api).*)",
};
