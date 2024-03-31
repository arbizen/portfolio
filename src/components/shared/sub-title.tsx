import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function SubTitle({
  title,
  seeMoreText,
  className,
}: {
  title: string;
  seeMoreText: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-between leading-tight',
        className,
      )}
    >
      <h2 className="text-[20px] font-bold leading-tight text-slate-800 sm:text-[16px]">
        {title}
      </h2>
      <Link
        className="flex items-center gap-1 space-x-1 text-[14px] font-bold text-blue-500"
        href="/"
      >
        {seeMoreText}
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
