import { withAuth } from "@kinde-oss/kinde-auth-nextjs/server";

export default withAuth(async (request) => {
  // This middleware protects routes that match the pattern
  // Routes under /admin/* require authentication
  return null;
});

export const config = {
  matcher: [
    // Protect all admin routes
    "/admin/:path*",
    // Protect API routes that need authentication
    "/api/admin/:path*",
  ],
};
