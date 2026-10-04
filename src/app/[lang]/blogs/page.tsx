import Card from '@/components/card';
import { isCitedBySupabase, orderBlogs } from '@/lib/project-highlights';
import Blog from '@/components/blogs/blog';
import PageInfo from '@/components/shared/page-info';
import PageTitle from '@/components/shared/page-title';
import Badge from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Subtitle from '@/components/shared/sub-title';
import { Blog as BlogType } from '@/types';
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


export const metadata = {
  title: 'Blog',
  description: 'Posts by Arb Rahim Badsa (Arbizen) on React, Next.js, Supabase, building products, and the occasional bit of life.',
  alternates: { canonical: '/en/blogs' },
  openGraph: { title: 'Blog', description: 'Posts by Arb Rahim Badsa (Arbizen) on React, Next.js, Supabase, building products, and the occasional bit of life.', url: '/en/blogs' },
};


export default async function Blogs({
  params,
}: {
  params: { slug: string; lang: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const pageName = `blogs`;
  const pagination = new Pagination({ limit: 100 }, pageName);
  const data = await pagination.getCurrentPageData();

  const blogs: BlogType[] = data[pageName]?.data;
  const nextPageUrl = pagination.nextPageUrl(data);

  // TODO: get dynamic category url with all the necessary query

  const supportedLang = supportedLocales.includes(params.lang)
    ? params.lang
    : 'en';

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
      />

      <div className="flex flex-col">
        {orderBlogs(blogs ?? []).map((blog: BlogType) => {
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
              citedBySupabase={isCitedBySupabase(blog)}
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
