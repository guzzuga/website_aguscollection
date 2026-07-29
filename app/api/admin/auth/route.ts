import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// POST /api/admin/auth — login with email + password
export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email dan password wajib diisi' }, { status: 400 });
  }

  const sb = createClient(supabaseUrl, supabaseAnonKey);
  const { data, error } = await sb.auth.signInWithPassword({ email, password });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  // Set token in httpOnly cookie
  const response = NextResponse.json({ success: true, user: { email: data.user.email } });

  response.cookies.set('sb-access-token', data.session.access_token, {
    path: '/',
    maxAge: 60 * 60, // 1 hour
    httpOnly: false,
    secure: false,
    sameSite: 'lax',
  });

  // Also set the Supabase default cookie
  response.cookies.set(`sb-${new URL(supabaseUrl).hostname.split('.')[0]}-auth-token`, data.session.access_token, {
    path: '/',
    maxAge: 60 * 60,
    httpOnly: false,
    secure: false,
    sameSite: 'lax',
  });

  return response;
}

// DELETE /api/admin/auth — logout
export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('sb-access-token');
  response.cookies.delete('sb-cqvcaiwqnkasbjfhttmk-auth-token');
  return response;
}
