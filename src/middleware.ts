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
    });
  } else {
    if (langInUrl !== langFromCookie && supportedLocales.includes(langInUrl)) {
      // update cookie if different
      res.cookies.set('lang', langInUrl, {
        path: '/',
      });
    }
  }
  const pathnameHasLocale = supportedLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );
  if (pathnameHasLocale) return res;
  const locale = langFromCookie ?? 'en'; // default locale
  if (pathname === '/') {
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  } else if (pathname === '/blogs') {
    request.nextUrl.pathname = `/${locale}/blogs`;
    return NextResponse.redirect(request.nextUrl);
  } else if (pathname === '/images') {
    request.nextUrl.pathname = `/${locale}/images`;
    return NextResponse.redirect(request.nextUrl);
  } else if (pathname === '/poems') {
    request.nextUrl.pathname = `/${locale}/poems`;
    return NextResponse.redirect(request.nextUrl);
  } else if (pathname === '/projects') {
    request.nextUrl.pathname = `/${locale}/projects`;
    return NextResponse.redirect(request.nextUrl);
  } else if (pathname === '/bookmarks') {
    request.nextUrl.pathname = `/${locale}/bookmarks`;
    return NextResponse.redirect(request.nextUrl);
  } else if (pathname === '/about') {
    request.nextUrl.pathname = `/${locale}/about`;
    return NextResponse.redirect(request.nextUrl);
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
