import { NextRequest, NextResponse } from 'next/server';
import { retiredLocales } from './data/site/supportedLocales';

/**
 * English only, under /en. Links from when the site had other languages
 * (/bn/blogs/…, /es/projects/…) go to the same page in English, permanently,
 * so nothing that was ever shared or indexed breaks. Bare paths (/blogs) get
 * the /en prefix.
 */
const PAGES = ['/', '/blogs', '/images', '/poems', '/projects', '/bookmarks', '/about', '/feedback', '/resume', '/admin/feedback'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split('/')[1];

  if (retiredLocales.includes(first)) {
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname.slice(first.length + 1)}`;
    return NextResponse.redirect(url, 308);
  }
  if (first !== 'en' && PAGES.includes(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === '/' ? '/en' : `/en${pathname}`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
