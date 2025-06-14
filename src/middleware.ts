import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
  matcher: [
    // Skip static files, internal routes, etc.
    '/((?!_next|.*\\..*|favicon.ico).*)',
    '/',
  ],
}
