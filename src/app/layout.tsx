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

const inter = Inter({ subsets: ['latin'] });

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
          <Header className="hidden sm:flex rounded-none" />
          <MobileMenu />
          {/* Mobile header */}
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
              className="right-[300px] top-[440px] sm:right-[100px] sm:h-[100px] sm:w-[100px] z-0"
              type="blob3"
              fill="#A855F7"
            />
            <div className="flex-grow min-h-screen sm:overflow-x-hidden">
              {children}
            </div>
            <Footer text={footer.text} socials={footer.socials} />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
