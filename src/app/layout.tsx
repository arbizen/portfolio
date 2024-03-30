import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { GeistSans } from 'geist/font/sans';
import Header from '@/components/shared/header';
import { Inter } from 'next/font/google';
import Blob from '@/components/blob';
import Footer from '@/components/shared/footer';
import { footer } from '@/data/footer';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          defaultTheme="light"
          enableSystem
          attribute="class"
          disableTransitionOnChange
        >
          <Header className="hidden sm:block rounded-none" />{' '}
          {/* Mobile header */}
          <main className="flex flex-col p-16 bg-white sm:px-4 sm:pb-4 sm:pt-0 sm:overflow-x-hidden">
            <Header className="sm:hidden" />
            <Blob x="300px" y="80px" className="sm:hidden" />
            <Blob
              className="right-[64px] top-[130px] sm:hidden"
              type="blob2"
              fill="#22C55E"
            />
            <Blob
              className="right-[300px] top-[440px] sm:hidden"
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
