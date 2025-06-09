import PageInfoSkeleton from '@/components/shared/page-info-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

const TagsSkeleton = () => (
  <div className="flex gap-2 flex-wrap">
    {['All', 'Next.js', 'React.js', 'TailwindCSS', 'CSS', 'Supabase'].map((_, i) => (
      <Skeleton key={i} className="h-8 w-20 rounded-full" />
    ))}
  </div>
);

const ProjectSkeleton = () => {
  return (
    <div className="flex gap-6 flex-col p-8 rounded-md border border-blue-100">
      <div className="flex justify-between items-center">
        <Skeleton className="w-24 h-5" />
        <Skeleton className="w-20 h-5" />
      </div>
      
      <div className="flex flex-col gap-4 flex-grow">
        <Skeleton className="w-full h-[180px] rounded-md aspect-auto" />

        <div className="flex flex-col gap-8 flex-grow">
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <Skeleton className="w-48 h-6" />
                <Skeleton className="w-20 h-5" />
              </div>
              <Skeleton className="w-full h-16" />
            </div>
            <div className="flex gap-2 flex-wrap w-full">
              <Skeleton className="w-20 h-6 rounded" />
              <Skeleton className="w-24 h-6 rounded" />
              <Skeleton className="w-16 h-6 rounded" />
            </div>
          </div>
          <div className="flex justify-between items-end flex-grow">
            <Skeleton className="w-24 h-4" />
            <div className="flex gap-4">
              <Skeleton className="w-20 h-8 rounded" />
              <Skeleton className="w-20 h-8 rounded" />
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
      {/* Page info with tags */}
      <div className="flex flex-col my-16 pl-[60px] gap-8 max-w-[860px] sm:pl-[15px] sm:gap-4 sm:mt-8 sm:mb-8">
        <Skeleton className="h-4 w-[100px] rounded-md" />
        <div className="flex flex-col gap-4 sm:gap-2">
          <Skeleton className="h-8 w-[120px] rounded-md" />
          <div className="text-[20px] text-slate-800 leading-tight">
            <Skeleton className="h-16 w-[600px] rounded-md sm:w-full" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-[80px] rounded-md" />
          <TagsSkeleton />
        </div>
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProjectSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
