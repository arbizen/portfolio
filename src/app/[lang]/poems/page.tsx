import Card from '@/components/card';
import PageInfo from '@/components/shared/page-info';
import PageTitle from '@/components/shared/page-title';
import Badge from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Subtitle from '@/components/shared/sub-title';
import { Poem as PoemType } from '@/types';
// @ts-ignore
import dateformat from 'dateformat';
import { Tag, TagContainer } from '@/components/tag';
import { getDictionary } from '../dictionaries';
import Breadcumb from '@/components/shared/breadcumb';
import Pagination from '@/lib/Pagination';
import PaginationNavigation from '@/components/shared/pagination-navigation';
import PageAnimation from '@/components/page-animation';
import { supportedLocales } from '@/data/site/supportedLocales';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Poems — Lines that I read and loved',
  description: 'This is the poems page',
};

const Poem = (props: PoemType) => {
  return (
    <Card className="p-16 sm:p-8">
      <div className="flex gap-8 sm:flex-col">
        <Link className="flex-none" href={`/${props.lang}/poems/${props.slug}`}>
          <Image
            unoptimized
            src={props.image!}
            alt="poem"
            width={360}
            height={240}
            className="rounded-md max-h-[240px] object-cover"
            placeholder="blur"
            blurDataURL="/blur-placeholder.png"
          />
        </Link>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 flex-wrap">
              <Badge className="bg-purple-100 text-purple-600">
                {props.author}
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
            href={`/${props.lang}/poems/${props.slug}`}
            className="hover:underline"
          >
            <h2 className="text-[36px] font-extrabold leading-tight sm:text-2xl sm:font-bold">
              {props.title}
            </h2>
          </Link>
          <p className="font-medium text-slate-600">{props.description}</p>
          <div className="flex justify-between">
            <Link
              href={`/${props.lang}/poems/${props.slug}`}
              className="flex items-center gap-1 text-xs font-bold leading-tight text-blue-500 hover:underline"
            >
              {props.page.poems.readMore}
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default async function Poems({
  params,
  searchParams,
}: {
  params: { slug: string; lang: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const category = searchParams?.category || '';
  const pageNumber = searchParams?.page || 1;

  const pageName = `poems`;
  const pagination = new Pagination(searchParams, pageName);
  const data = await pagination.getCurrentPageData();

  const poems: PoemType[] = data[pageName]?.data;
  const nextPageUrl = pagination.nextPageUrl(data);

  const supportedLang = supportedLocales.includes(params.lang)
    ? params.lang
    : cookies().get('lang')?.value ?? 'en';

  const { page } = await getDictionary(supportedLang);

  const tagsWithLink = [
    { name: 'All', path: 'All' },
    { name: 'Love', path: 'Love' },
    { name: 'Nature', path: 'Nature' },
    { name: 'Life', path: 'Life' },
    { name: 'Death', path: 'Death' },
    { name: 'Friendship', path: 'Friendship' },
    { name: 'Hope', path: 'Hope' },
    { name: 'Faith', path: 'Faith' },
    { name: 'Inspiration', path: 'Inspiration' },
    { name: 'Classic', path: 'Classic' },
    { name: 'Modern', path: 'Modern' },
    { name: 'Uncategorized', path: 'Uncategorized' },
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
              name: page.poems.name,
              url: `/${params.lang}/poems`,
            }}
          />
        }
        itemsLength={poems?.length}
        header={<PageTitle title={page.poems.name} />}
        description={page.poems.description}
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

      <div className="flex flex-col gap-4 relative z-50">
        {poems?.map((poem: PoemType) => {
          if (poem.isPublished === false) return null;
          return (
            <Poem
              id={poem.id}
              slug={poem.slug}
              title={poem.title}
              author={poem.author}
              categories={poem.categories}
              date={poem.date}
              description={poem.description}
              image={poem.image}
              key={poem.id}
              lang={params.lang}
              page={page}
            />
          );
        })}
      </div>

      {poems?.length > 24 && <PaginationNavigation nextPageLink={nextPageUrl} />}

      {!poems || poems.length === 0 ? (
        <div className="w-full h-[200px] flex items-center justify-center relative z-50">
          <p className="text-slate-500 text-base">
            Looks like it&apos;s too empty here!
          </p>
        </div>
      ) : null}
    </PageAnimation>
  );
}
