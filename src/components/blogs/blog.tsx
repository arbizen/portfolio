import SupabaseBadge from '@/components/shared/supabase-badge';
import Link from 'next/link';
import { Blog as BlogType } from '@/types';
// @ts-ignore
import dateformat from 'dateformat';

/** One post: its title and date on a line, the description under it. */
export default function Blog(props: BlogType & { compact?: boolean; citedBySupabase?: boolean }) {
  return (
    <Link href={`/blogs/${props.slug}`} className="group -mx-2 flex flex-col gap-1 rounded-md px-2 py-2 transition-colors hover:bg-neutral-50">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-[15px] text-neutral-900">
          {props.title}
          {props.citedBySupabase ? <SupabaseBadge>Featured by Supabase</SupabaseBadge> : null}
        </h3>
        <time className="flex-none text-sm tabular-nums text-neutral-500">{dateformat(props.date, 'mmm yyyy')}</time>
      </div>
      {props.description && !props.compact ? <p className="line-clamp-2 text-sm text-neutral-500">{props.description}</p> : null}
    </Link>
  );
}
