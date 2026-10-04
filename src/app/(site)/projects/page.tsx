import Card from '@/components/card';
import { ProjectBadges, orderProjects } from '@/lib/project-highlights';
import PageInfo from '@/components/shared/page-info';
import PageTitle from '@/components/shared/page-title';
import Badge from '@/components/ui/badge';
import { ArrowRight, BadgeEuro } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Subtitle from '@/components/shared/sub-title';
import { Blog, Project as ProjectType } from '@/types';
// @ts-ignore
import dateformat from 'dateformat';
import { Tag, TagContainer } from '@/components/tag';
import Chip from '@/components/chip';
import { getDictionary } from '../dictionaries';
import Breadcumb from '@/components/shared/breadcumb';
import Pagination from '@/lib/Pagination';
import PaginationNavigation from '@/components/shared/pagination-navigation';
import PageAnimation from '@/components/page-animation';


export const metadata = {
  title: 'Projects',
  description: 'Things Arbizen has built: Kitty Messages, Blank Board, Supabase hackathon winners Wordbuzz and Supadraw, and more.',
  alternates: { canonical: '/projects' },
  openGraph: { title: 'Projects', description: 'Things Arbizen has built: Kitty Messages, Blank Board, Supabase hackathon winners Wordbuzz and Supadraw, and more.', url: '/projects', images: ['/opengraph-image.png'] },
};

/** One project: its name and what it is, the year, and what it is built with. */
const Project = (props: ProjectType) => {
  return (
    <Link
      href={`/projects/${props.slug}`}
      className="-mx-2 flex flex-col gap-1 rounded-md px-2 py-2.5 transition-colors hover:bg-neutral-50"
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[15px] text-neutral-900">
          {props.name}
          <ProjectBadges project={props} />
        </span>
        <span className="flex-none text-sm tabular-nums text-neutral-500">{props.year}</span>
      </div>
      {props.description ? <p className="text-sm text-neutral-500">{props.description}</p> : null}
      {props.stack?.length ? <p className="text-xs text-neutral-500">{props.stack.join(' · ')}</p> : null}
    </Link>
  );
};

export default async function Blogs({
  params,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const pageName = `projects`;
  const pagination = new Pagination({ limit: 100 }, pageName);
  const data = await pagination.getCurrentPageData('desc');

  // Kitty first, then the hackathon winners, the same as the home page.
  const projects: ProjectType[] = orderProjects(data[pageName]?.data ?? []);
  const nextPageUrl = pagination.nextPageUrl(data);

  const { page: dictionaryPage } = await getDictionary('en');

  const tagsWithLink = [
    { name: 'All', path: 'All' },
    { name: 'Next.js', path: 'Next.js' },
    { name: 'React.js', path: 'React.js' },
    { name: 'TailwindCSS', path: 'TailwindCSS' },
    { name: 'CSS', path: 'CSS' },
    { name: 'Supabase', path: 'Supabase' },
    { name: 'Firebase', path: 'Firebase' },
  ];

  return (
    <PageAnimation>
      <PageInfo
        breadcumb={
          <Breadcumb
            firstNav={{
              name: dictionaryPage.home.name.third,
              url: '/',
            }}
            secondNav={{
              name: dictionaryPage.projects.name,
              url: `/projects`,
            }}
          />
        }
        header={<PageTitle title={dictionaryPage.projects.name} />}
        description={dictionaryPage.projects.description}
        itemsLength={projects.length}
      />
      <section className="flex flex-col">
        {projects.map((project) => (
          <Project key={project.id} {...project} />
        ))}

        {projects.length > 24 && (
          <PaginationNavigation nextPageLink={nextPageUrl} />
        )}

        {projects.length === 0 && (
          <div className="w-full h-[200px] flex items-center justify-center">
            <p className="text-slate-500 text-base">
              Looks like it&apos;s too empty here!
            </p>
          </div>
        )}
      </section>
    </PageAnimation>
  );
}
