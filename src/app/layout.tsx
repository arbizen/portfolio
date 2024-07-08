import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { GeistSans } from 'geist/font/sans';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { cn } from '@/lib/utils';

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
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(GeistSans.className, 'sm:overflow-x-hidden')}>
        <ThemeProvider
          defaultTheme="light"
          enableSystem
          attribute="class"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
