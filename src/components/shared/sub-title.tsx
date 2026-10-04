import Link from 'next/link';
import { cn } from '@/lib/utils';

/** A section's name, with a quiet "see all" on the right. */
export default function SubTitle({
  title,
  seeMoreText,
  className,
  seeMoreLink,
}: {
  title: string;
  seeMoreText?: string;
  className?: string;
  seeMoreLink?: string;
}) {
  return (
    <div className={cn('mb-4 flex items-baseline justify-between', className)}>
      <h2 className="text-[15px] font-medium text-neutral-900">{title}</h2>
      {seeMoreText && seeMoreLink ? (
        <Link href={seeMoreLink} className="text-sm text-neutral-500 transition-colors hover:text-neutral-900">
          {seeMoreText}
        </Link>
      ) : null}
    </div>
  );
}
