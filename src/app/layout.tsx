import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { GeistSans } from 'geist/font/sans';
import Header from '@/components/shared/header';
import { Inter } from 'next/font/google';
import Blob from '@/components/blob';

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
          <main className="flex flex-col p-16 bg-white">
            <Header />
            <Blob x="300px" y="80px" />
            <Blob
              className="right-[64px] top-[130px]"
              type="blob2"
              fill="#22C55E"
            />
            <Blob
              className="right-[300px] top-[440px]"
              type="blob3"
              fill="#A855F7"
            />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
