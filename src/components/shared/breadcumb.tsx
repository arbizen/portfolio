'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function Breadcumb() {
  const pathname = usePathname();
  const capitalize = (str: string) =>
    str.replace('/', '').charAt(0).toUpperCase() + str.slice(2);
  return (
    <p className="flex gap-2 font-medium text-slate-600">
      <Link href="/">Home</Link>{' '}
      {capitalize(pathname) && (
        <>
          &gt; <Link href={pathname}>{capitalize(pathname)}</Link>
        </>
      )}
    </p>
  );
}
