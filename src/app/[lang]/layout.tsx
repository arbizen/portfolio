import type { Metadata } from 'next';
import Footer from '@/components/shared/footer';
import SiteHeader from '@/components/shared/site-header';
import { footer } from '@/data/footer';
import { getDictionary } from './dictionaries';

// Each page sets its own canonical. A shared one here pointed every page,
// every post and project included, at the home page.
export const metadata: Metadata = {};

/**
 * Every page is built ahead of time and served from Vercel's CDN, so it
 * opens instantly. After this many seconds the next visit still gets the
 * cached page at once, and a fresh one is built from Notion in the
 * background. To show a Notion edit right away, open /api/revalidate.
 */
export const revalidate = 300;

export function generateStaticParams() {
  return [{ lang: 'en' }];
}

export default async function RootLayout({
  params: { lang },
  children,
}: {
  params: { lang: string };
  children: React.ReactNode;
}) {
  const { header } = await getDictionary(lang);
  return (
    <div
      className={`mx-auto flex min-h-screen w-full max-w-[640px] flex-col bg-white px-6 py-12 sm:px-5 sm:py-8`}
    >
      <SiteHeader data={header} />
      <main className="mt-14 flex-grow sm:mt-10">{children}</main>
      <Footer text={footer.text} socials={footer.socials} />
    </div>
  );
}
