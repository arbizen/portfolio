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
import { Tag, TagContainer } from '@/components/tag';
import { getDictionary } from '../dictionaries';
import Breadcumb from '@/components/shared/breadcumb';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Blogs — New curated blogs for you',
  description: 'This is the home page',
};

const Blog = (props: Blog) => {
  return (
    <Card className="p-16 sm:p-8">
      <div className="flex gap-8 sm:flex-col">
        <Link className="flex-none" href={`/${props.lang}/blogs/${props.slug}`}>
          <Image
            src={props.image!}
            alt="blog"
            width={360}
            height={240}
            className="rounded-md max-h-[240px] object-cover"
            placeholder="blur"
            blurDataURL="/blur-placeholder.png"
          />
        </Link>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Badge className="bg-blue-100 text-blue-600">
                {props.readTime} min read
              </Badge>
              {props?.categories?.map((category: string) => (
                <Badge key={category} className="bg-red-100 text-red-500">
                  {category}
                </Badge>
              ))}
            </div>
            <span className="text-xs text-slate-600">
              {dateformat(props.date, 'ddS mmmm, yyyy')}
            </span>
          </div>
          <Link
            href={`/${props.lang}/blogs/${props.slug}`}
            className="hover:underline"
          >
            <h2 className="text-[36px] font-extrabold leading-tight sm:text-2xl sm:font-bold">
              {props.title}
            </h2>
          </Link>
          <p className="font-medium text-slate-600">{props.description}</p>
          <div className="flex justify-between">
            <Link
              href={`/${props.lang}/blogs/${props.slug}`}
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
  params: { slug: string; lang: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const start = searchParams?.start || 0;
  const count = searchParams?.count || 25;
  const cursor = searchParams?.cursor || '';
  const category = searchParams?.category || '';
  const url = !cursor
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/data/blogs?start=${start}&count=${count}&category=${category}`
    : `${process.env.NEXT_PUBLIC_API_URL}/api/data/blogs/${cursor}?start=${start}&count=${count}&category=${category}`;
  const res = await fetch(url);
  const data = await res.json();
  let blogs: Blog[] = data.blogs?.data;
  const pageEnd = data.bookmarks?.end;
  const hasMore = data.bookmarks?.has_more;
  const nextCursor = data.bookmarks?.next_cursor;
  let nextPageUrl;
  if (Number(start) == 100 - Number(count) || cursor) {
    nextPageUrl = `/blogs?cursor=${nextCursor ?? cursor}&start=${
      pageEnd ?? start
    }&count=${count}&category=${category}`;
  } else {
    nextPageUrl = `/blogs?start=${
      pageEnd ?? start
    }&count=${count}&category=${category}`;
  }

  const { page } = await getDictionary(params.lang);

  const tagsWithLink = [
    { name: 'All', path: 'All' },
    { name: 'NextJs', path: 'NextJs' },
    { name: 'ReactJs', path: 'ReactJs' },
    { name: 'Frontend', path: 'Frontend' },
    { name: 'Backend', path: 'Backend' },
    { name: 'Supabase', path: 'Supabase' },
    { name: 'Story', path: 'Story' },
    { name: 'Textile', path: 'Textile' },
    { name: 'Uncategorized', path: 'Uncategorized' },
    { name: 'GraphQL', path: 'GraphQL' },
    { name: 'Typescript', path: 'Typescript' },
    { name: 'Popular', path: 'Popular' },
  ];

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
              name: page.blogs.name,
              url: `/${params.lang}/blogs`,
            }}
          />
        }
        itemsLength={blogs.length}
        header={<PageTitle title={page.blogs.name} />}
        description={page.blogs.description}
        footer={
          <>
            <TagContainer>
              {tagsWithLink.map((tag) => (
                <Link
                  href={`/${params.lang}/blogs?category=${tag.path}`}
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

      <div className="flex flex-col gap-4">
        {blogs?.map((blog: Blog) => (
          <Blog
            id={blog.id}
            slug={blog.slug}
            title={blog.title}
            categories={blog.categories}
            date={blog.date}
            description={blog.description}
            image={blog.image}
            key={blog.id}
            readTime={blog.readTime}
            lang={params.lang}
          />
        ))}
      </div>

      {blogs.length === 0 && (
        <div>
          <p className="text-slate-500 text-sm">
            Looks like it&apos;s too empty here!
          </p>
        </div>
      )}
    </div>
  );
}
