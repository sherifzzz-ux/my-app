export { auth as middleware } from "@/auth-edge";

export const config = {
	matcher: ["/admin/:path*", "/api/admin/:path*", "/account/:path*"],
};


