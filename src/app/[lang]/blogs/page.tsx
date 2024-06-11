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
import { useMemo } from 'react';
import Pagination from '@/lib/Pagination';
import PaginationNavigation from '@/components/shared/pagination-navigation';
import PageAnimation from '@/components/page-animation';
import { supportedLocales } from '@/data/site/supportedLocales';
import { cookies } from 'next/headers';

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
            unoptimized
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
                {props.readTime} {props.page.blogs.minRead}
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
              {props.page.blogs.readMore}
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
  const category = searchParams?.category || '';
  const pageNumber = searchParams?.page || 1;

  const pageName = `blogs`;
  const pagination = new Pagination(searchParams, pageName);
  const data = await pagination.getCurrentPageData();

  const blogs: Blog[] = data[pageName]?.data;
  const nextPageUrl = pagination.nextPageUrl(data);

  // TODO: get dynamic category url with all the necessary query

  const supportedLang = supportedLocales.includes(params.lang)
    ? params.lang
    : cookies().get('lang')?.value ?? 'en';

  const { page } = await getDictionary(supportedLang);

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
    <PageAnimation>
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

      <div className="flex flex-col gap-4">
        {blogs?.map((blog: Blog) => {
          if (blog.isPublished === false) return null;
          return (
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
              page={page}
            />
          );
        })}
      </div>

      {blogs.length > 24 && <PaginationNavigation nextPageLink={nextPageUrl} />}

      {blogs.length === 0 && (
        <div className="w-full h-[200px] flex items-center justify-center">
          <p className="text-slate-500 text-base">
            Looks like it&apos;s too empty here!
          </p>
        </div>
      )}
    </PageAnimation>
  );
}
