import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Public routes - allow without auth
  if (pathname === '/' || pathname === '/login' || pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // Dashboard routes - allow (demo access enabled)
  if (pathname.startsWith('/dashboard')) {
    return NextResponse.next()
  }

  // API routes - allow
  if (pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
