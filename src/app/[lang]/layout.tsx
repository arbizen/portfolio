import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { GeistSans } from 'geist/font/sans';
import Header from '@/components/shared/header';
import { Inter } from 'next/font/google';
import Blob from '@/components/blob';
import Footer from '@/components/shared/footer';
import { footer } from '@/data/footer';
import MobileMenu from '@/components/shared/mobile-menu';
import { getDictionary } from './dictionaries';

export const metadata: Metadata = {
  alternates: {
    canonical: `/en`,
    languages: {
      en: '/en',
      bn: '/bn',
      es: '/es',
    },
  },
};

export default async function RootLayout({
  params: { lang },
  children,
}: {
  params: { lang: string };
  children: React.ReactNode;
}) {
  const { header } = lang && (await getDictionary(lang));
  return (
    <>
      <Header data={header} className="hidden sm:flex rounded-none" />
      <MobileMenu data={header} />

      <main className="flex flex-col p-16 bg-white sm:px-4 sm:pb-4 sm:pt-0 sm:overflow-x-hidden">
        <Header data={header} className="sm:hidden" />
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
          className="right-[300px] top-[440px] sm:right-[100px] sm:h-[100px] sm:w-[100px] z-0 opacity-40"
          type="blob3"
          fill="#A855F7"
        />
        <div className="flex-grow min-h-screen sm:overflow-x-hidden">
          {children}
        </div>
        <Footer text={footer.text} socials={footer.socials} />
      </main>
    </>
  );
}
