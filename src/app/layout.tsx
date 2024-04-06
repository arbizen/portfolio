import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { GeistSans } from 'geist/font/sans';
import Header from '@/components/shared/header';
import { Inter } from 'next/font/google';
import Blob from '@/components/blob';
import Footer from '@/components/shared/footer';
import { footer } from '@/data/footer';
import MobileMenu from '@/components/shared/mobile-menu';
import Script from 'next/script';

export const metadata: Metadata = {
  creator: 'Arb Rahim Badsa',
  category: 'technology',
  applicationName: 'Arb Rahim Badsa',
  description: `Discover the portfolio of Arb Rahim Badsa (Arbizen), a talented JavaScript developer with expertise in React.js, Next.js, TypeScript, Supabase, Figma, and more. Explore a range of projects showcasing Arbizen's skills in web development, blogs, liked poems, images and more.`,
  keywords: [
    'Portfolio',
    'Arb Rahim Badsa',
    'Arb Rahim Badsa Portfolio',
    'Arb Rahim Badsa Blog',
    'Arb Rahim Badsa Website',
    'Arb Rahim Badsa Personal Website',
    'Arb Rahim Badsa Projects',
    'Arbizen Blog',
    'Arbizen Website',
    'Arbizen Portfolio',
    'Arbizen Projects',
    'Arb Blog',
    'Arb Website',
    'Arb Portfolio',
    'Arb Projects',
    'Arb Personal Website',
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL!),
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      bn: '/bn',
      es: '/es',
    },
  },
};

const siteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Arbizen',
  alternateName: ['Arb', 'Arb Rahim Badsa'],
  url: process.env.NEXT_PUBLIC_API_URL!,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider
          defaultTheme="light"
          enableSystem
          attribute="class"
          disableTransitionOnChange
        >
          <Script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
          />
          {children}
          {/* <Header className="hidden sm:flex rounded-none" />
          <MobileMenu />
        
          <main className="flex flex-col p-16 bg-white sm:px-4 sm:pb-4 sm:pt-0 sm:overflow-x-hidden">
            <Header className="sm:hidden" />
            <Blob
              y="80px"
              className="left-[300px] sm:left-[50px] sm:h-[100px] sm:w-[100px] z-0"
            />
            <Blob
              className="right-[64px] top-[130px] sm:right-[32px] sm:h-[100px] sm:w-[100px] z-0"
              type="blob2"
              fill="#22C55E"
            />
            <Blob
              className="right-[300px] top-[440px] sm:right-[100px] sm:h-[100px] sm:w-[100px] z-0 sm:opacity-40"
              type="blob3"
              fill="#A855F7"
            />
            <div className="flex-grow min-h-screen sm:overflow-x-hidden">
              {children}
            </div>
            <Footer text={footer.text} socials={footer.socials} />
          </main> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
