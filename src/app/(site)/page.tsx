import Link from 'next/link';
import Script from 'next/script';
import { Blog as BlogType } from '@/types';
import Pagination from '@/lib/Pagination';
import { getDictionary } from './dictionaries';
import SubTitle from '@/components/shared/sub-title';
import Blog from '@/components/blogs/blog';
import { ProjectBadges, SUPABASE_RECOGNITION, homeProjects, isCitedBySupabase, orderBlogs } from '@/lib/project-highlights';
import SupabaseBadge from '@/components/shared/supabase-badge';
import UpworkBadge from '@/components/shared/upwork-badge';

export const metadata = {
  title: { absolute: 'Arbizen · Arb Rahim Badsa, developer and poem writer' },
  description: 'I build small, sweet things for the internet, like Kitty Messages, and write about code, poems and life. The home of Arb Rahim Badsa (Arbizen).',
  alternates: { canonical: '/' },
  openGraph: { title: 'Arbizen · Arb Rahim Badsa, developer and poem writer', description: 'I build small, sweet things for the internet, like Kitty Messages, and write about code, poems and life. The home of Arb Rahim Badsa (Arbizen).', url: '/', images: ['/opengraph-image.png'] },
};

const SITE_URL = process.env.NEXT_PUBLIC_API_URL!;

/** Who this site is, for search engines: the person, and the site that is theirs. */
const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Arb Rahim Badsa',
      alternateName: ['Arbizen', 'Arb'],
      url: `${SITE_URL}`,
      image: `${SITE_URL}/arb.png`,
      jobTitle: 'Full-stack developer',
      description: 'Self-taught full-stack developer who builds small, sweet products like Kitty Messages, and writes poems.',
      sameAs: ['https://github.com/arbizen', 'https://x.com/arbizzen'],
      knowsAbout: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Supabase', 'PostgreSQL', 'Web development'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'Arbizen',
      alternateName: ['Arb Rahim Badsa'],
      url: `${SITE_URL}`,
      publisher: { '@id': `${SITE_URL}/#person` },
    },
  ],
};


/**
 * Home: who I am, what I have built, what I have written, and where
 * everything else lives. One column, plain text, read in under a minute.
 */
export default async function Home() {
  const [projectsData, blogsData] = await Promise.all([
    new Pagination({ limit: 25 }, 'projects').getCurrentPageData('desc'),
    new Pagination({ limit: 25 }, 'blogs').getCurrentPageData('desc'),
  ]);
  const projects = homeProjects(projectsData.projects?.data ?? []);
  const published: BlogType[] = (blogsData.blogs?.data ?? []).filter((b: BlogType) => b.isPublished !== false);
  // The post Supabase cited leads the list, whatever its date; then the newest.
  const blogs = orderBlogs(published).slice(0, 6);

  const dictionary = await getDictionary('en');

  return (
    <div className="flex flex-col gap-14">
      <section className="flex flex-col gap-4">
        <h1 className="text-xl font-medium tracking-tight text-neutral-900">Arbizen</h1>
        <p className="text-[15px] leading-relaxed text-neutral-600">{dictionary.page.home.description}</p>
        <p className="text-[15px] leading-relaxed text-neutral-600">
          Lately I am building{' '}
          <a href="https://kittymessages.com" className="text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900">
            Kitty Messages
          </a>
          , personalized cat cards people send to the ones they love.
        </p>
        <div className="flex gap-4 text-sm">
          <Link
            href={`/about`}
            className="text-neutral-500 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-900 hover:decoration-neutral-900"
          >
            {dictionary.page.home.knowMoreAboutMe}
          </Link>
        </div>
      </section>

      <section>
        <SubTitle title={dictionary.page.projects.name} seeMoreText="All" seeMoreLink={`/projects`} />
        <ul className="flex flex-col">
          {projects.map((project) => (
            <li key={project.id}>
              <Link
                href={`/projects/${project.slug}`}
                className="-mx-2 flex items-baseline justify-between gap-4 rounded-md px-2 py-2 transition-colors hover:bg-neutral-50"
              >
                <span className="min-w-0">
                  <span className="text-[15px] text-neutral-900">{project.name}</span>
                  <ProjectBadges project={project} />
                  <span className="ml-2 text-sm text-neutral-500 sm:ml-0 sm:mt-0.5 sm:block">{project.description}</span>
                </span>
                <span className="flex-none text-sm tabular-nums text-neutral-500">{project.year}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* The proof: Upwork's top badge, and Supabase on its own blog and GitHub. */}
      <section>
        <SubTitle title="Recognition" />
        <ul className="flex flex-col">
          <li>
            <div className="-mx-2 flex items-baseline justify-between gap-4 rounded-md px-2 py-2">
              <span className="min-w-0">
                <span className="text-[15px] text-neutral-900">Upwork</span>
                <UpworkBadge>Top Rated Plus</UpworkBadge>
                <span className="ml-2 text-sm text-neutral-500 sm:ml-0 sm:mt-0.5 sm:block">5+ years building for clients</span>
              </span>
              <span className="flex-none text-sm tabular-nums text-neutral-500">2+ years</span>
            </div>
          </li>
          <li>
            <div className="-mx-2 flex items-baseline justify-between gap-4 rounded-md px-2 py-2">
              <span className="min-w-0">
                <span className="text-[15px] text-neutral-900">Dean&apos;s List</span>
                {' '}
                <span className="inline-flex items-center gap-0.5 whitespace-nowrap align-baseline text-[11px] text-neutral-500">
                  <svg viewBox="0 0 24 24" className="h-3 w-3 flex-none" fill="none" stroke="#B8860B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 9 12 4 2 9l10 5 10-5Z" />
                    <path d="M6 11v4.5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V11" />
                    <path d="M22 9v5" />
                  </svg>
                  Twice in a row, and counting
                </span>
                <span className="ml-2 text-sm text-neutral-500 sm:ml-0 sm:mt-0.5 sm:block">3.89 CGPA</span>
              </span>
              <span className="flex-none text-sm tabular-nums text-neutral-500">2021 to 2023</span>
            </div>
          </li>
          {SUPABASE_RECOGNITION.map((win) => (
            <li key={win.url}>
              <a
                href={win.url}
                target="_blank"
                rel="noopener"
                className="-mx-2 flex items-baseline justify-between gap-4 rounded-md px-2 py-2 transition-colors hover:bg-neutral-50"
              >
                <span className="min-w-0">
                  <span className="text-[15px] text-neutral-900">{win.project}</span>
                  <SupabaseBadge>{win.prize}</SupabaseBadge>
                  <span className="ml-2 text-sm text-neutral-500 sm:ml-0 sm:mt-0.5 sm:block">{win.event}</span>
                </span>
                <span className="flex-none text-sm tabular-nums text-neutral-500">{win.date}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SubTitle title={dictionary.page.home.recentBlogs} seeMoreText="All" seeMoreLink={`/blogs`} />
        <div className="flex flex-col">
          {blogs.map((blog) => (
            <Blog key={blog.id} {...blog} page={dictionary.page} compact citedBySupabase={isCitedBySupabase(blog)} />
          ))}
        </div>
      </section>


      <Script id="json-ld-site" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }} />
    </div>
  );
}
