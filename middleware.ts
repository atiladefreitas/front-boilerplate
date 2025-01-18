import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const token = request.cookies.get("auth_token");
	const pathname = request.nextUrl.pathname;

	if (
		pathname.startsWith("/(dashboard)") ||
		pathname.startsWith("/dashboard") ||
		pathname.startsWith("/(dashboard)") ||
		pathname.startsWith("/home")
	) {
		if (!token) {
			return NextResponse.redirect(new URL("/login", request.url));
		}
	}

	// Redirect authenticated users away from auth pages
	if ((pathname === "/login" || pathname === "/register") && token) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/(dashboard)/:path*", // Protect dashboard layout group
		"/dashboard/:path*", // Protect dashboard routes
		"/home/:path*", // Protect dashboard routes
		"/login",
		"/register",
	],
};
