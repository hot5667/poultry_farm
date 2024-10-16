import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('sb-ipybojcftcgitunzyror-auth-token');

  if (token) {
    if (req.nextUrl.pathname === '/signin' ) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  if (!token) {
    if (req.nextUrl.pathname === '/mypage' || req.nextUrl.pathname === '/detail') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/signin', '/mypage', '/detail'],  
};
