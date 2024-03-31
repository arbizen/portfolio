'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

export default function Breadcumb({
  firstNav,
  secondNav,
}: {
  firstNav?: {
    name: string;
    url: string;
  };
  secondNav?: {
    name: string;
    url: string;
  };
}) {
  if (secondNav || firstNav) {
    return (
      <p className="flex gap-2 font-medium text-slate-600 items-center">
        <Link href={firstNav?.url!}>{firstNav?.name}</Link>
        {secondNav && (
          <>
            {' '}
            <ChevronRight size={16} />
            <Link href={secondNav.url}>{secondNav.name}</Link>
          </>
        )}
      </p>
    );
  }

  const path = usePathname();
  const pathname = path.split('/')[1];

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);
  return (
    <p className="flex gap-2 font-medium text-slate-600 items-center">
      <Link className="sm:text-base" href="/">
        Home
      </Link>{' '}
      {capitalize(pathname) && (
        <>
          <ChevronRight size={16} />
          <Link href={pathname}>
            {capitalize(decodeURIComponent(pathname))}
          </Link>
        </>
      )}
    </p>
  );
}
