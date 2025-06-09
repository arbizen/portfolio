import PageInfoSkeleton from '@/components/shared/page-info-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

const TagsSkeleton = () => (
  <div className="flex gap-2 flex-wrap">
    {['All', 'Website', 'Game'].map((_, i) => (
      <Skeleton key={i} className="h-8 w-16 rounded-full" />
    ))}
  </div>
);

const BookmarkSkeleton = () => (
  <div className="px-6 py-[20px] border border-blue-100 rounded-md flex-grow max-w-[400px]">
    <div className="flex items-center gap-2">
      <Skeleton className="w-32 h-5" />
      <Skeleton className="w-16 h-5 rounded" />
    </div>
    <div className="mt-1 flex items-center gap-1">
      <Skeleton className="w-4 h-4" />
      <Skeleton className="w-48 h-3" />
    </div>
    <Skeleton className="mt-2 w-full h-12" />
  </div>
);

export default function Loading() {
  return (
    <div>
      {/* Page info with tags */}
      <div className="flex flex-col my-16 pl-[60px] gap-8 max-w-[860px] sm:pl-[15px] sm:gap-4 sm:mt-8 sm:mb-8">
        <Skeleton className="h-4 w-[100px] rounded-md" />
        <div className="flex flex-col gap-4 sm:gap-2">
          <Skeleton className="h-8 w-[150px] rounded-md" />
          <div className="text-[20px] text-slate-800 leading-tight">
            <Skeleton className="h-16 w-[600px] rounded-md sm:w-full" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-[50px] rounded-md" />
          <TagsSkeleton />
        </div>
      </div>

      {/* Bookmarks grid */}
      <section className="flex flex-wrap gap-4 relative z-50">
        {Array.from({ length: 9 }).map((_, i) => (
          <BookmarkSkeleton key={i} />
        ))}
      </section>
    </div>
  );
}
