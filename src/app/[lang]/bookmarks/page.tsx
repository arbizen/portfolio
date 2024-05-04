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

export const metadata = {
  title: 'Bookmarks — Some of the best links I adore',
  description: 'This is the home page',
};

export const dynamic = 'force-dynamic';

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

  const { page } = await getDictionary(params.lang);

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
        footer={
          <>
            <TagContainer>
              {tagsWithLink.map((tag) => (
                <Link
                  href={`/${params.lang}/${pageName}?${
                    pageNumber ? `page=${pageNumber}` : ''
                  }&category=${tag.path}`}
                  key={tag.name}
                >
                  <Tag
                    className={
                      category === tag.name
                        ? 'border-slate-800'
                        : 'border-slate-200'
                    }
                  >
                    {tag.name}
                  </Tag>
                </Link>
              ))}
            </TagContainer>
          </>
        }
      />
      <section className="flex flex-wrap gap-4">
        {bookmarks.map((bookmark) => (
          <Link
            key={bookmark.id}
            href={bookmark.link}
            target="_blank"
            className="flex-grow max-w-[400px]"
          >
            <Card className="px-6 py-[20px]">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{bookmark.name}</h3>
                <Badge className="bg-blue-100 text-blue-500">
                  {bookmark.type}
                </Badge>
              </div>
              <div className="mt-1 flex items-center gap-1">
                <Link2 size={15} />
                <span className="text-xs">{bookmark.link}</span>
              </div>
              <p className="mt-2 leading-tight text-slate-600">
                {bookmark.description}
              </p>
            </Card>
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
