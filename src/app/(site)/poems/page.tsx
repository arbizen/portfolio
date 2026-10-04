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


export const metadata = {
  title: 'Poems',
  description: 'Poems written and loved by Arb Rahim Badsa (Arbizen), many of them in Bengali.',
  alternates: { canonical: '/poems' },
  openGraph: { title: 'Poems', description: 'Poems written and loved by Arb Rahim Badsa (Arbizen), many of them in Bengali.', url: '/poems', images: ['/opengraph-image.png'] },
};

/** One poem: its title and date on a line, who wrote it and its first lines under it. */
const Poem = (props: PoemType) => {
  return (
    <Link
      href={`/poems/${props.slug}`}
      className="-mx-2 flex flex-col gap-1 rounded-md px-2 py-2.5 transition-colors hover:bg-neutral-50"
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[15px] text-neutral-900">{props.title}</span>
        <time className="flex-none text-sm tabular-nums text-neutral-500">{dateformat(props.date, 'mmm yyyy')}</time>
      </div>
      {props.description ? <p className="line-clamp-2 text-sm text-neutral-500">{props.description}</p> : null}
      {/* Only credit other poets; mine go unsigned. */}
      {props.author && !isMine(props.author) ? <p className="text-xs text-neutral-500">{props.author}</p> : null}
    </Link>
  );
};

/** A poem I wrote (signed "Arb" in Notion), as opposed to one I'm sharing. */
const isMine = (author: string) => /^arb\b/i.test(author.trim());

export default async function Poems({
  params,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const pageName = `poems`;
  const pagination = new Pagination({ limit: 100 }, pageName);
  const data = await pagination.getCurrentPageData();

  const poems: PoemType[] = data[pageName]?.data;
  const nextPageUrl = pagination.nextPageUrl(data);

  const { page } = await getDictionary('en');

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
              url: '/',
            }}
            secondNav={{
              name: page.poems.name,
              url: `/poems`,
            }}
          />
        }
        itemsLength={poems?.length}
        header={<PageTitle title={page.poems.name} />}
        description={page.poems.description}
      />

      <div className="flex flex-col">
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
