import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supabase } from './utils/supabaseClient';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Избегаем проверки на страницах авторизации или если это API запрос
  if (pathname.startsWith('/auth') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Проверка сессии
  const session = supabase.auth.session();

  if (!session && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard'],
};
