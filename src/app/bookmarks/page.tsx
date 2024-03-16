import Card from '@/components/card';
import PageInfo from '@/components/shared/page-info';
import PageTitle from '@/components/shared/page-title';
import Link from 'next/link';
import Badge from '@/components/ui/badge';
import { Link2 } from 'lucide-react';
import { Bookmark } from '@/types';

export const metadata = {
  title: 'Bookmarks — Some of the best links I adore',
  description: 'This is the home page',
};

export const dynamic = 'force-dynamic';

export default async function Bookmarks() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/data/bookmarks`,
  );
  const data = await res.json();
  const bookmarks: Bookmark[] = data.bookmarks;
  return (
    <div>
      <PageInfo
        header={<PageTitle title="Bookmarks" />}
        description={`These are some of the best poems I’ve read so far. The list updates really frequently as I love reading poems a lot.`}
      />
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
