import PageInfoSkeleton from '@/components/shared/page-info-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

const ProjectSkeleton = () => {
  return (
    <div className="flex gap-6 flex-col p-8 rounded-md border border-blue-100">
      <div className="flex justify-between items-center">
        <Skeleton className="w-20 h-6" />
        <Skeleton className="w-20 h-6" />
      </div>
      <div className="flex flex-col gap-4 flex-grow">
        <Skeleton className="w-full h-[180px] rounded-md aspect-auto" />

        <div className="flex flex-col gap-8 flex-grow">
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <Skeleton className="w-40 h-6" />
                <Skeleton className="w-20 h-6" />
              </div>
              <Skeleton className="w-full h-10" />
            </div>
            <div className="flex gap-2 flex-wrap w-full">
              <Skeleton className="w-20 h-6" />
              <Skeleton className="w-20 h-6" />
            </div>
          </div>
          <div className="flex justify-between items-end flex-grow">
            <Skeleton className="w-20 h-6" />
            <div className="flex gap-4">
              <Skeleton className="w-20 h-6" />
              <Skeleton className="w-20 h-6" />
            </div>
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
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-1">
        <ProjectSkeleton />
        <ProjectSkeleton />
        <ProjectSkeleton />
        <ProjectSkeleton />
      </div>
    </div>
  );
}
