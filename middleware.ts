import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function middleware(request: NextRequest) {
  // Only protect /admin routes (but not /admin/login)
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Check for Supabase auth session token
  const authCookie = request.cookies.get('sb-access-token')?.value
    || request.cookies.get('sb-cqvcaiwqnkasbjfhttmk-auth-token')?.value;

  if (!authCookie) {
    const redirectUrl = new URL('/admin/login', request.url);
    redirectUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Verify session is valid
  const sb = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
  });

  const { data: { user }, error } = await sb.auth.getUser(authCookie);

  if (error || !user) {
    const redirectUrl = new URL('/admin/login', request.url);
    redirectUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
