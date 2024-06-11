import { NextRequest, NextResponse } from 'next/server';
import { supportedLocales } from './data/site/supportedLocales';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const langInUrl = pathname.split('/')[1];
  const langFromCookie = request.cookies.get('lang')?.value;
  const res = NextResponse.next();
  if (!langFromCookie && supportedLocales.includes(langInUrl)) {
    // add cookie if not exists
    res.cookies.set('lang', langInUrl, {
      path: '/',
      // set expiry date to 1 year
      expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    });
  } else {
    if (langInUrl !== langFromCookie && supportedLocales.includes(langInUrl)) {
      // update cookie if different
      res.cookies.set('lang', langInUrl, {
        path: '/',
        expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      });
    }
  }
  const pathnameHasLocale = supportedLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );
  if (pathnameHasLocale) return res;
  const locale = langFromCookie ?? 'en'; // default locale
  // pages to be redirected
  const pages = [
    '/',
    '/blogs',
    '/images',
    '/poems',
    '/projects',
    '/bookmarks',
    '/about',
  ];
  if (pages.includes(pathname)) {
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }
  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
