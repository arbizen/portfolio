import { NextRequest, NextResponse } from 'next/server';
import { retiredLocales } from './data/site/retiredLocales';

/**
 * The site lives at plain addresses (/blogs, /about). Links from when it had
 * language prefixes (/en/blogs/…, /bn/projects/…) go to the same page without
 * the prefix, permanently, so nothing that was ever shared or indexed breaks.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split('/')[1];

  if (retiredLocales.includes(first)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(first.length + 1) || '/';
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
