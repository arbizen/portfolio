import Link from 'next/link';

type Crumb = { name: string; url: string };

/**
 * "Home / Blogs / This post": the way back up, in the header's own style.
 * The last crumb is the page you are on, so it is text, not a link. Also
 * tells search engines the trail (BreadcrumbList), so results can show
 * "Arbizen › Blogs" instead of a long address.
 */
export default function Breadcumb({
  firstNav,
  secondNav,
  current,
}: {
  firstNav?: Crumb;
  secondNav?: Crumb;
  /** The page itself, when it sits below secondNav (a post, a project). */
  current?: string;
}) {
  const links = [firstNav, secondNav].filter(Boolean) as Crumb[];
  if (!links.length) return null;
  // Without `current`, the last link is the page itself (a list page).
  const trail = current ? links : links.slice(0, -1);
  const here = current ?? links[links.length - 1].name;

  const site = process.env.NEXT_PUBLIC_API_URL ?? '';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [...links.map((c) => c), ...(current ? [{ name: current, url: '' }] : [])].map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      ...(c.url ? { item: `${site}${c.url}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
        {trail.map((c) => (
          <li key={c.url} className="flex items-center gap-x-2">
            <Link href={c.url} className="text-neutral-500 transition-colors hover:text-neutral-900">
              {c.name}
            </Link>
            <span aria-hidden="true" className="text-neutral-300">
              /
            </span>
          </li>
        ))}
        <li aria-current="page" className="min-w-0 truncate text-neutral-900">
          {here}
        </li>
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}
