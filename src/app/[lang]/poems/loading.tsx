import PageInfoSkeleton from '@/components/shared/page-info-skeleton';
import { Skeleton } from '@/components/ui/skeleton';
import Card from '@/components/card';

const PoemSkeleton = () => {
  return (
    <Card className="p-16 sm:p-8">
      <div className="flex gap-8 sm:flex-col">
        <Skeleton className="h-[240px] w-[360px] rounded-md" />
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-20" />
            </div>
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-12 w-4/5" />
          <Skeleton className="h-20 w-full" />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default function Loading() {
  return (
    <div>
      <PageInfoSkeleton />
      <div className="flex flex-col gap-4">
        <PoemSkeleton />
        <PoemSkeleton />
        <PoemSkeleton />
        <PoemSkeleton />
      </div>
    </div>
  );
}
