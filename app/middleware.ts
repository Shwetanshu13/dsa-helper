// Next.js Middleware for route protection
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/((?!api/auth|setup).*)"], // Protect all routes except /api/auth and /setup
};
