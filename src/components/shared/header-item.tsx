'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function HeaderItem({
  route,
  name,
}: {
  route: string;
  name: string;
}) {
  const pathname = usePathname();
  if (pathname === route) {
    return (
      <div className="flex flex-col items-center">
        <Link className="text-slate-900 font-medium" href={route}>
          {name}
        </Link>
        <div className="h-[5px] w-[5px] rounded-full bg-blue-500 gap-1"></div>
      </div>
    );
  }
  return (
    <Link className="text-slate-600" href={route}>
      {name}
    </Link>
  );
}
