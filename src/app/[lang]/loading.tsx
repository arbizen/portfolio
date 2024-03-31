import PageInfoSkeleton from '@/components/shared/page-info-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div>
      <PageInfoSkeleton />
      <div className="flex items-center justify-between mb-16 sm:mb-8">
        <Skeleton className="h-4 w-[100px] rounded-md" />
        <Skeleton className="h-4 w-[100px] rounded-md" />
      </div>
      <div className="flex flex-col gap-4">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-md" />
        ))}
      </div>
    </div>
  );
}
