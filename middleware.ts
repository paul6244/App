import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default async function middleware(req) {
  const session = await auth()
  const { pathname } = req.nextUrl

  // Signed in but trying to access auth pages
  if (session && (pathname === "/login" || pathname === "/signup" || pathname === "/")) {
    return NextResponse.redirect(new URL("/home", req.url))
  }

  // Not signed in and trying to access protected pages
  if (!session && pathname !== "/login" && pathname !== "/signup" && pathname !== "/") {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/home/:path*",
    "/profile/:path*",
    "/orders/:path*",
    "/cart/:path*",
    "/restaurant/:path*",
    "/item/:path*",
    "/checkout/:path*",
    "/search/:path*",
    "/login",
    "/signup",
    "/",
  ],
}
