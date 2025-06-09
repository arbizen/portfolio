import Card from '@/components/card';
import PageInfo from '@/components/shared/page-info';
import SubTitle from '@/components/shared/sub-title';
import Badge from '@/components/ui/badge';
import { Activity, Blog as BlogType, ImageType, Feedback } from '@/types';
import { ArrowRight, Download, Subtitles } from 'lucide-react';
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
import Blog from '@/components/blogs/blog';
import Image from 'next/image';
import Circles from '@/components/circles';
import { SkillBeam } from '@/components/skill-beam';
import CustomImage from '@/components/gallery-image';
import { Client } from '@notionhq/client';
import PublicFeedbackList from '@/components/feedback/public-feedback-list';

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

  // Fetch recent images
  const images = 'images';
  const paginationImages = new Pagination({ limit: 3 }, images);
  const dataImages = await paginationImages.getCurrentPageData('desc');
  const imagesData: ImageType[] = dataImages[images]?.data;

  // Fetch recent answered feedback/questions
  const FEEDBACK_DATABASE_ID = process.env.NOTION_FEEDBACK_DATABASE_ID;
  let recentFeedbacks: Feedback[] = [];

  try {
    if (FEEDBACK_DATABASE_ID) {
      const notion = new Client({ auth: process.env.NOTION_TOKEN! });
      const response = await notion.databases.query({
        database_id: FEEDBACK_DATABASE_ID,
        filter: {
          and: [
            {
              property: 'response',
              rich_text: {
                is_not_empty: true,
              },
            },
            {
              property: 'isResolved',
              checkbox: {
                equals: true,
              },
            },
            {
              property: 'publishResponse',
              checkbox: {
                equals: true,
              },
            },
          ],
        },
        sorts: [
          {
            property: 'createdAt',
            direction: 'descending',
          },
        ],
        page_size: 3, // Limit to 3 recent feedbacks
      });

      recentFeedbacks = response.results.map((page: any) => {
        const properties = page.properties;
        return {
          id: page.id,
          name: properties.name?.title[0]?.plain_text || '',
          email: properties.email?.rich_text[0]?.plain_text || '',
          message: properties.message?.rich_text[0]?.plain_text || '',
          date: properties.createdAt?.date?.start || new Date().toISOString(),
          type:
            properties.type?.select?.name === 'Question'
              ? 'question'
              : 'feedback',
          isResolved: properties.isResolved?.checkbox || false,
          response: properties.response?.rich_text[0]?.plain_text || '',
        };
      });
    }
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
  }

  const supportedLang = supportedLocales.includes(lang)
    ? lang
    : (cookies().get('lang')?.value ?? 'en');

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
            <div className="flex flex-row gap-4 sm:gap-4">
              <Link
                className="flex gap-1 items-center text-blue-500 font-bold text-[14px]"
                href="/about"
              >
                {dictionary.page.home.knowMoreAboutMe} <ArrowRight size={16} />
              </Link>
              <Link
                className="flex gap-1 items-center text-green-600 font-bold text-[14px]"
                href={`/${lang}/resume`}
              >
                {dictionary.page.home.downloadCV} <Download size={16} />
              </Link>
            </div>
          }
        />
        <div className="w-full">
          <SkillBeam />
        </div>
      </div>

      <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-blue-700 mb-1">
              Want to ask a question or give feedback?
            </h2>
            <p className="text-slate-700">
              I&apos;m always here to help you or answer your questions.
            </p>
          </div>
          <Link
            href={`/${lang}/feedback`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors"
          >
            Give Feedback <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Recent answered feedback/questions section */}
      {recentFeedbacks.length > 0 && (
        <div className="mb-8">
          <SubTitle
            title="Recently Answered Questions"
            seeMoreText="View All"
            seeMoreLink={`/${lang}/feedback`}
          />
          <div className="mt-6">
            <PublicFeedbackList feedbacks={recentFeedbacks} />
          </div>
        </div>
      )}

      <div>
        <SubTitle
          title={dictionary.page.home.activities}
          seeMoreText={dictionary.page.home.allActivities}
        />
        <section className="mt-8 flex flex-col gap-4">
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

      <div className="mt-8">
        <SubTitle
          title={dictionary.page.images.name}
          seeMoreText="All Images"
          seeMoreLink={`/${lang}/images`}
        />
      </div>
      <div className="mt-8 w-full">
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-1">
          {imagesData?.map((image: ImageType) => (
            <CustomImage
              src={image.src}
              alt={image.alt}
              key={image.id}
              height={300}
              width={500}
              className="h-full w-full"
              link={`/${lang}/images/${image.id}`}
              date={image.date}
            />
          ))}
        </div>
      </div>

      <Script
        id="json-ld-site"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
      />
    </PageAnimation>
  );
}
