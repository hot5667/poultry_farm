import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
     const token = req.cookies.get('sb-ipybojcftcgitunzyror-auth-token');

     console.log(req);


     if(token){
          console.log("토큰이 있습니다.")
          if(req.nextUrl.pathname === '/signin'){
               return NextResponse.redirect(new URL('/', req.url))
          }
     }

     return NextResponse.next();
}

export const config = {
     matcher : ['/signin'],
};