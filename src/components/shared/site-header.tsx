'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

/**
 * The whole header: a name and a row of plain text links. Nothing to open
 * on a phone; the links simply wrap.
 */
export default function SiteHeader({ data }: { data: any }) {
  const pathname = usePathname();
  const nav = (data.nav as { name: string; url: string }[]).filter(
    (item) =>
      !item.url.includes('/admin') && !item.url.endsWith('/feedback') && !item.url.endsWith('/bookmarks') && item.url !== data.siteName.url,
  );
  return (
    <header className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        {/* On the home page the name is the page's own heading, so not twice. */}
        {pathname === data.siteName.url ? (
          <span />
        ) : (
          <Link href={data.siteName.url} className="text-[15px] font-medium text-neutral-900">
            Arbizen
          </Link>
        )}
      </div>
      <nav className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm">
        {nav.map((item, i) => {
          const active = pathname === item.url || pathname.startsWith(`${item.url}/`);
          return (
            <span key={item.url} className="flex items-center gap-x-2.5">
            {i > 0 ? (
              <span aria-hidden="true" className="text-neutral-300">
                /
              </span>
            ) : null}
            <Link
              href={item.url}
              className={cn(
                'transition-colors',
                active ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-900',
              )}
            >
              {item.name}
            </Link>
            </span>
          );
        })}
      </nav>
    </header>
  );
}
