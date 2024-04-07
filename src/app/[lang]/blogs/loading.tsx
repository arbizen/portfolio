import PageInfoSkeleton from '@/components/shared/page-info-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

const BlogSkeleton = () => {
  return (
    <div className="p-16 sm:p-8">
      <div className="flex gap-8 sm:flex-col">
        <Skeleton className="w-[360px] h-[240px] rounded-md" />
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Skeleton className="w-20 h-5" />
              <Skeleton className="w-20 h-5" />
            </div>
            <Skeleton className="w-40 h-5" />
          </div>
          <Skeleton className="w-[400px] sm:w-60 h-8" />
          <Skeleton className="w-40 h-5" />
          <div className="flex justify-between">
            <Skeleton className="w-20 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Loading() {
  return (
    <div>
      <PageInfoSkeleton />
      <div className="flex flex-col gap-4">
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
      </div>
    </div>
  );
}
