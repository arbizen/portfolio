'use client';
import Card from '@/components/card';
import Link from 'next/link';
import Badge from '@/components/ui/badge';
import { Link2 } from 'lucide-react';
import { Bookmark } from '@/types';
import { useSearchParams } from 'next/navigation';

interface BookmarksProps {
  bookmarks: Bookmark[];
  pageEnd: string;
}

export default function Bookmarks({ bookmarks, pageEnd }: BookmarksProps) {
  const searchParams = useSearchParams();
  const end = pageEnd;
  const count = 25; // default
  return (
    <>
      <Link href={`/bookmarks?start=${end}&count=${count}`}>
        <button>Load more</button>
      </Link>
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
            <p className="leading-tight text-slate-600 mt-2 max-w-[100px]">
              {bookmark.description}
            </p>
          </Card>
        </Link>
      ))}
    </>
  );
}
