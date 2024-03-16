import PageInfo from '@/components/shared/page-info';
import PageTitle from '@/components/shared/page-title';
import Card from '@/components/card';
import Link from 'next/link';
import Badge from '@/components/ui/badge';
import { Link2 } from 'lucide-react';
import { Bookmark } from '@/types';

export const metadata = {
  title: 'Bookmarks — Some of the best links I adore',
  description: 'This is the home page',
};

export const dynamic = 'force-dynamic';

export default async function BookmarksPage({
  params,
  searchParams,
}: {
  params: { slug: string };
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

  return (
    <div>
      <PageInfo
        header={<PageTitle title="Bookmarks" />}
        description={`These are some of the best poems I’ve read so far. The list updates really frequently as I love reading poems a lot.`}
        itemsLength={bookmarks.length ?? 0}
      />
      {bookmarks?.length !== 0 && (
        <Link href={nextPageUrl}>
          <button>Load more</button>
        </Link>
      )}
      <section className="flex flex-wrap gap-4">
        {bookmarks.map((bookmark: Bookmark) => (
          <Link
            key={bookmark.id}
            href={bookmark.link}
            target="_blank"
            className="flex-grow"
          >
            <Card className="px-6 py-[20px]">
              <div className="flex gap-2 items-center">
                <h3 className="font-semibold">{bookmark.name}</h3>
                <Badge className="bg-blue-100 text-blue-500">
                  {bookmark.type}
                </Badge>
              </div>
              <div className="flex gap-1 mt-1 items-center">
                <Link2 size={15} />
                <span className="text-xs">{bookmark.link}</span>
              </div>
              <p className="leading-tight text-slate-600 mt-2">
                {bookmark.description}
              </p>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
