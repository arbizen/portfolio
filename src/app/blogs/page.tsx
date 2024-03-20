import Card from '@/components/card';
import PageInfo from '@/components/shared/page-info';
import PageTitle from '@/components/shared/page-title';
import Badge from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Subtitle from '@/components/shared/sub-title';
import { Blog } from '@/types';
// @ts-ignore
import dateformat from 'dateformat';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Blogs — New curated blogs for you',
  description: 'This is the home page',
};

const Blog = (props: Blog) => {
  return (
    <Card className="p-16">
      <div className="flex gap-8">
        <Link className="flex-none" href={`/blogs/${props.slug}`}>
          <Image
            src={props.image!}
            alt="blog"
            width={360}
            height={240}
            className="rounded-md max-h-[240px] object-cover"
          />
        </Link>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Badge className="bg-blue-100 text-blue-600">
                {props.readTime} min read
              </Badge>
              <Badge className="bg-red-100 text-red-600">
                {props.category}
              </Badge>
            </div>
            <span className="text-xs text-slate-600">
              {dateformat(props.date, 'ddS mmmm, yyyy')}
            </span>
          </div>
          <Link href={`/blogs/${props.slug}`} className="hover:underline">
            <h2 className="text-[36px] font-extrabold leading-tight">
              {props.title}
            </h2>
          </Link>
          <p className="font-medium text-slate-600">{props.description}</p>
          <div className="flex justify-between">
            <Link
              href={`/blogs/${props.slug}`}
              className="flex items-center gap-1 text-xs font-bold leading-tight text-blue-500 hover:underline"
            >
              Read more
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default async function Blogs({
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
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/data/blogs?start=${start}&count=${count}`
    : `${process.env.NEXT_PUBLIC_API_URL}/api/data/blogs/${cursor}?start=${start}&count=${count}`;
  const res = await fetch(url);
  const data = await res.json();
  let blogs: Blog[] = data.blogs?.data;
  const recentBlogs = blogs?.slice(0, 2);
  blogs = blogs?.slice(2);
  const pageEnd = data.bookmarks?.end;
  const hasMore = data.bookmarks?.has_more;
  const nextCursor = data.bookmarks?.next_cursor;
  let nextPageUrl;
  if (Number(start) == 100 - Number(count) || cursor) {
    nextPageUrl = `/blogs?cursor=${nextCursor ?? cursor}&start=${
      pageEnd ?? start
    }&count=${count}`;
  } else {
    nextPageUrl = `/blogs?start=${pageEnd ?? start}&count=${count}`;
  }
  return (
    <div>
      <PageInfo
        header={<PageTitle title="Blogs" />}
        description={`These are some of the best poems I’ve read so far. The list updates really frequently as I love reading poems a lot.`}
      />
      <div className="flex flex-col gap-4">
        {recentBlogs?.map((blog: Blog) => (
          <Blog
            id={blog.id}
            slug={blog.slug}
            title={blog.title}
            category={blog.category}
            date={blog.date}
            description={blog.description}
            image={blog.image}
            key={blog.id}
            readTime={blog.readTime}
          />
        ))}
      </div>
      <Subtitle className="py-8" title="NextJs" seeMoreText="See more" />
      <div className="flex flex-col gap-4">
        {blogs?.map((blog: Blog) => (
          <Blog
            id={blog.id}
            slug={blog.slug}
            title={blog.title}
            category={blog.category}
            date={blog.date}
            description={blog.description}
            image={blog.image}
            key={blog.id}
            readTime={blog.readTime}
          />
        ))}
      </div>
    </div>
  );
}
