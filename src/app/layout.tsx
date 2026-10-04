import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { GeistSans } from 'geist/font/sans';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { cn } from '@/lib/utils';
import { GoogleAnalytics } from '@next/third-parties/google';

const SITE_DESCRIPTION =
  'Arbizen is Arb Rahim Badsa, a self-taught full-stack developer who builds small, sweet products like Kitty Messages, and writes about code, poems and life.';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL!),
  // Every page reads "Page · Arbizen" in search results and tabs.
  title: { default: 'Arbizen · Arb Rahim Badsa', template: '%s · Arbizen' },
  description: SITE_DESCRIPTION,
  applicationName: 'Arbizen',
  creator: 'Arb Rahim Badsa',
  authors: [{ name: 'Arb Rahim Badsa', url: process.env.NEXT_PUBLIC_API_URL! }],
  category: 'technology',
  keywords: ['Arbizen', 'Arb Rahim Badsa', 'Arb', 'full-stack developer', 'Next.js', 'React', 'Kitty Messages', 'blog', 'poems'],
  openGraph: {
    type: 'website',
    siteName: 'Arbizen',
    locale: 'en_US',
    description: SITE_DESCRIPTION,
  },
  twitter: { card: 'summary_large_image', creator: '@arbizzen', site: '@arbizzen' },
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
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </body>
    </html>
  );
}
