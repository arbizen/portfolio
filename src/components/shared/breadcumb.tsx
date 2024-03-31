'use client';
import Link from 'next/link';
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
}
