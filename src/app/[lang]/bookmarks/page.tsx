import PageInfo from '@/components/shared/page-info';
import PageTitle from '@/components/shared/page-title';
import Card from '@/components/card';
import Link from 'next/link';
import Badge from '@/components/ui/badge';
import { Link2 } from 'lucide-react';
import { Bookmark } from '@/types';
import { getDictionary } from '../dictionaries';
import Breadcumb from '@/components/shared/breadcumb';

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
  const start = searchParams?.start || 0;
  const count = searchParams?.count || 25;
  const cursor = searchParams?.cursor || '';
  const url = !cursor
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/data/bookmarks?start=${start}&count=${count}`
    : `${process.env.NEXT_PUBLIC_API_URL}/api/data/bookmarks/${cursor}?start=${start}&count=${count}`;
  const res = await fetch(url);
  const data = await res.json();
  const bookmarks: Bookmark[] = data.bookmarks?.data;
  const pageEnd = data.bookmarks?.end;
  const hasMore = data.bookmarks?.has_more;
  const nextCursor = data.bookmarks?.next_cursor;
  let nextPageUrl;
  if (Number(start) == 100 - Number(count) || cursor) {
    nextPageUrl = `/bookmarks?cursor=${nextCursor ?? cursor}&start=${
      pageEnd ?? start
    }&count=${count}`;
  } else {
    nextPageUrl = `/bookmarks?start=${pageEnd ?? start}&count=${count}`;
  }

  const { page } = await getDictionary(params.lang);

  return (
    <div>
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
      {/* {bookmarks?.length !== 0 && (
        <Link href={nextPageUrl}>
          <button>Load more</button>
        </Link>
      )} */}
      <section className="flex flex-wrap gap-4">
        {bookmarks.map((bookmark) => (
          <Link
            key={bookmark.id}
            href={bookmark.link}
            target="_blank"
            className="flex-grow"
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
      </section>
    </div>
  );
}
