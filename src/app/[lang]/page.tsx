import Card from '@/components/card';
import PageInfo from '@/components/shared/page-info';
import SubTitle from '@/components/shared/sub-title';
import Badge from '@/components/ui/badge';
import { Activity, Blog as BlogType } from '@/types';
import { ArrowRight, Subtitles } from 'lucide-react';
import Link from 'next/link';
import { getDictionary } from './dictionaries';
import Breadcumb from '@/components/shared/breadcumb';
import Pagination from '@/lib/Pagination';
// @ts-ignore
import dateformat from 'dateformat';
import PageAnimation from '@/components/page-animation';
import Script from 'next/script';
import { supportedLocales } from '@/data/site/supportedLocales';
import { cookies } from 'next/headers';
import { Blog } from './blogs/page';
import Image from 'next/image';
import Circles from '@/components/circles';
import { SkillBeam } from '@/components/skill-beam';

export const metadata = {
  title: `Home — Arb Rahim Badsa's Activities and Portfolio`,
  description: `Discover the portfolio of Arb Rahim Badsa (Arbizen), a talented JavaScript developer with expertise in React.js, Next.js, TypeScript, Supabase, Figma, and more. Explore a range of projects showcasing Arbizen's skills in web development, blogs, liked poems, images and more.`,
};

const siteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Arbizen',
  alternateName: ['Arb', 'Arb Rahim Badsa'],
  url: process.env.NEXT_PUBLIC_API_URL!,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${process.env.NEXT_PUBLIC_API_URL}/en/blogs?category={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export const dynamic = 'force-dynamic';

export default async function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}/api/data/activities`,
  // );
  // console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/data/activities`);
  // const data = await res.json();
  // const activities: Activity[] = data.activities.data;

  const pageName = `activities`;
  const pagination = new Pagination({ limit: 10 }, pageName);
  const data = await pagination.getCurrentPageData('desc');

  const activities: Activity[] = data[pageName]?.data;

  const blogs = 'blogs';

  const paginationBlogs = new Pagination({ limit: 2 }, blogs);

  const dataBlogs = await paginationBlogs.getCurrentPageData('desc');

  const blogsData: BlogType[] = dataBlogs[blogs]?.data;

  const supportedLang = supportedLocales.includes(lang)
    ? lang
    : cookies().get('lang')?.value ?? 'en';

  const dictionary = await getDictionary(supportedLang);

  return (
    <PageAnimation>
      <div className="flex items-start w-full sm:flex-wrap">
        <PageInfo
          breadcumb={
            <Breadcumb
              firstNav={{
                name: dictionary.page.home.name.third,
                url: `/${lang}`,
              }}
            />
          }
          header={
            <div>
              <h1 className="font-black text-[40px] sm:text-[36px]">
                {dictionary.page.home.name.first}{' '}
                <span className="text-blue-500">
                  {dictionary.page.home.name.second}
                </span>
              </h1>
            </div>
          }
          description={dictionary.page.home.description}
          footer={
            <div className="flex flex-col gap-2">
              <Link
                className="flex gap-1 items-center text-blue-500 font-bold text-[14px]"
                href="/about"
              >
                {dictionary.page.home.knowMoreAboutMe} <ArrowRight size={16} />
              </Link>
            </div>
          }
        />
        <div className="w-full">
          <SkillBeam />
        </div>
      </div>
      <div>
        <SubTitle
          title={dictionary.page.home.activities}
          seeMoreText={dictionary.page.home.allActivities}
        />
        <section className="pt-[64px] flex flex-col gap-4 sm:pt-[32px]">
          {activities.map((activity: Activity) => (
            <Link key={activity.id} href={activity.link!} target="_blank">
              <Card className="px-6 py-[20px]">
                <h3 className="font-semibold text-base">{activity.name}</h3>
                <div className="flex gap-2 mt-1 items-center">
                  <span className="text-xs text-slate-600">
                    {dateformat(activity.date, 'ddS mmm, yyyy')} at{' '}
                    {dateformat(activity.date, 'h:MM TT')}
                  </span>
                  <Badge className="bg-red-100 text-red-500">
                    {activity.type}
                  </Badge>
                </div>
              </Card>
            </Link>
          ))}
        </section>
      </div>
      <div className="mt-8">
        <SubTitle
          title={dictionary.page.home.recentBlogs}
          seeMoreText={dictionary.page.home.allBlogs}
          seeMoreLink={`/${lang}/blogs`}
        />
      </div>
      <div className="flex flex-col gap-4 mt-8">
        {blogsData?.map((blog: BlogType) => {
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
              lang={lang}
              page={dictionary.page}
            />
          );
        })}
      </div>
      <Script
        id="json-ld-site"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
      />
    </PageAnimation>
  );
}
