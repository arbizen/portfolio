import { NextRequest, NextResponse } from 'next/server';
import { supportedLocales } from './data/site/supportedLocales';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = supportedLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );
  if (pathnameHasLocale) return;
  const locale = 'en'; // default locale
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
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    '/',
    '/blogs',
    '/images',
    '/poems',
    '/projects',
    '/bookmarks',
    '/about',
    // Optional: only run on root (/) URL
    // '/'
  ],
};
