import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { GeistSans } from 'geist/font/sans';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { cn } from '@/lib/utils';
import { GoogleAnalytics } from '@next/third-parties/google';

const SITE_DESCRIPTION =
  'Arbizen is a full-stack developer building thoughtful web products with Next.js, React and TypeScript, and the creator of Kitty Messages.';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL!),
  // Every page reads "Page · Arbizen" in search results and tabs.
  title: { default: 'Arbizen · Full-Stack Developer', template: '%s · Arbizen' },
  description: SITE_DESCRIPTION,
  applicationName: 'Arbizen',
  creator: 'Arbizen',
  authors: [{ name: 'Arbizen', url: process.env.NEXT_PUBLIC_API_URL! }],
  category: 'technology',
  keywords: ['Arbizen', 'full-stack developer', 'web developer', 'product engineer', 'Next.js', 'React', 'TypeScript', 'Supabase', 'Kitty Messages'],
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
