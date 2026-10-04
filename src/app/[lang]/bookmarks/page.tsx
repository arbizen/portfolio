import PageInfo from '@/components/shared/page-info';
import PageTitle from '@/components/shared/page-title';
import Card from '@/components/card';
import Link from 'next/link';
import Badge from '@/components/ui/badge';
import { Link2 } from 'lucide-react';
import { Bookmark } from '@/types';
import { getDictionary } from '../dictionaries';
import Breadcumb from '@/components/shared/breadcumb';
import Pagination from '@/lib/Pagination';
import PaginationNavigation from '@/components/shared/pagination-navigation';
import { Tag, TagContainer } from '@/components/tag';
import PageAnimation from '@/components/page-animation';
import { supportedLocales } from '@/data/site/supportedLocales';

export const metadata = {
  title: 'Bookmarks',
  description: 'Links, tools and websites Arbizen keeps coming back to.',
  alternates: { canonical: '/en/bookmarks' },
  openGraph: { title: 'Bookmarks', description: 'Links, tools and websites Arbizen keeps coming back to.', url: '/en/bookmarks' },
};


export default async function BookmarksPage({
  params,
  searchParams,
}: {
  params: { slug: string; lang: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const category = searchParams?.category || '';
  const pageNumber = searchParams?.page || 1;

  const pageName = `bookmarks`;
  const pagination = new Pagination(searchParams, pageName);
  const data = await pagination.getCurrentPageData();

  const bookmarks: Bookmark[] = data[pageName]?.data;
  const nextPageUrl = pagination.nextPageUrl(data);

  const supportedLang = supportedLocales.includes(params.lang)
    ? params.lang
    : 'en';

  const { page } = await getDictionary(supportedLang);

  const tagsWithLink = [
    { name: 'All', path: 'All' },
    { name: 'Website', path: 'Website' },
    { name: 'Game', path: 'Game' },
  ];

  return (
    <PageAnimation>
      <PageInfo
        breadcumb={
          <Breadcumb
            firstNav={{
              name: page.home.name.third,
              url: `/${params.lang}`,
            }}
            secondNav={{
              name: page.bookmarks.name,
              url: `/${params.lang}/bookmarks`,
            }}
          />
        }
        header={<PageTitle title={page.bookmarks.name} />}
        description={page.bookmarks.description}
        itemsLength={bookmarks.length ?? 0}
      />
      <section className="flex flex-col">
        {bookmarks.map((bookmark) => (
          <Link
            key={bookmark.id}
            href={bookmark.link}
            target="_blank"
            className="-mx-2 flex flex-col gap-1 rounded-md px-2 py-2.5 transition-colors hover:bg-neutral-50"
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-[15px] text-neutral-900">{bookmark.name}</span>
              <span className="flex-none text-sm text-neutral-500">
                {(() => {
                  try {
                    return new URL(bookmark.link).hostname.replace(/^www\./, '');
                  } catch {
                    return '';
                  }
                })()}
              </span>
            </div>
            {bookmark.description ? <p className="text-sm text-neutral-500">{bookmark.description}</p> : null}
          </Link>
        ))}
        {bookmarks.length > 24 && (
          <PaginationNavigation nextPageLink={nextPageUrl} />
        )}
        {bookmarks.length === 0 && (
          <div className="w-full h-[200px] flex items-center justify-center">
            <p className="text-slate-500 text-base">
              Looks like it&apos;s too empty here!
            </p>
          </div>
        )}
      </section>
    </PageAnimation>
  );
}
