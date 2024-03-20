'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function Breadcumb() {
  const path = usePathname();
  const pathname = path.split('/')[1];

  console.log(path);
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);
  return (
    <p className="flex gap-2 font-medium text-slate-600">
      <Link href="/">Home</Link>{' '}
      {capitalize(pathname) && (
        <>
          &gt;{' '}
          <Link href={pathname}>
            {capitalize(decodeURIComponent(pathname))}
          </Link>
        </>
      )}
    </p>
  );
}
