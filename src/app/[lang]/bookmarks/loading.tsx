import PageInfoSkeleton from '@/components/shared/page-info-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

const BookmarkSkeleton = () => (
  <div className="px-6 py-[20px] border border-blue-100 rounded-md flex-grow">
    <div className="flex items-center gap-2">
      <Skeleton className="w-24 h-4" />
      <Skeleton className="w-12 h-4" />
    </div>
    <div className="mt-1 flex items-center gap-1">
      <Skeleton className="w-full h-4" />
    </div>
    <Skeleton className="mt-4 w-full h-4" />
  </div>
);

export default function Loading() {
  return (
    <div>
      <PageInfoSkeleton />
      <div className="flex flex-wrap gap-4">
        <BookmarkSkeleton />
        <BookmarkSkeleton />
        <BookmarkSkeleton />
        <BookmarkSkeleton />
        <BookmarkSkeleton />
        <BookmarkSkeleton />
        <BookmarkSkeleton />
        <BookmarkSkeleton />
        <BookmarkSkeleton />
        <BookmarkSkeleton />
      </div>
    </div>
  );
}
