// import { withAuth } from "@kinde-oss/kinde-auth-nextjs/server";

// export default withAuth(async (request) => {
//   // This middleware protects routes that match the pattern
//   // Routes under /admin/* require authentication
//   return null;
// });

// export const config = {
//   matcher: [
//     // Protect all admin routes
//     "/admin/:path*",
//     // Protect API routes that need authentication
//     "/api/admin/:path*",
//   ],
// };


import {withAuth} from "@kinde-oss/kinde-auth-nextjs/middleware";

const publicroutes = ["/"];


const apiAuthPrefix = "/api/auth";

const DEFAULT_LOGIN_REDIRECT = "/dashboard";



export default function middleware(req) {
  const { nextUrl } = req;


  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicroutes.includes(nextUrl.pathname);


  if (isApiAuthRoute) {
    return null;
  }

  if (isPublicRoute) {
    return null;
  }


  return withAuth(req, {
    isReturnToCurrentPage: true
  });
}




export const config = {
  matcher: ["/(api|trpc)(.)", "/", "/admin/:path*"],
};