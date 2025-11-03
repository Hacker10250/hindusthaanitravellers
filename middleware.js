import { clerkMiddleware } from '@clerk/nextjs/server';

// Register Clerk middleware so Clerk's server helpers (auth(), currentUser(), etc.) can
// detect requests and work correctly on the server.
export default clerkMiddleware();

// Exclude Next.js static assets and favicon from the middleware matcher.
export const config = {
  // Run middleware for all routes except next static assets and the favicon
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
