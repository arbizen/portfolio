import PageInfoSkeleton from '@/components/shared/page-info-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

const FeedbackFormSkeleton = () => (
  <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100 shadow-sm">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <Skeleton className="h-6 w-80 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>
      <Skeleton className="h-10 w-32 rounded-md" />
    </div>
  </div>
);

const PublicFeedbackSkeleton = () => (
  <div className="space-y-6">
    {[1, 2, 3, 4, 5].map((_, i) => (
      <div key={i} className="p-5 border border-blue-100 rounded-md">
        <div className="mb-4">
          <div className="flex items-center mb-1 gap-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
          <Skeleton className="h-3 w-24" />
        </div>
        <div className="p-3 bg-slate-50 rounded-md mb-4">
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="border-l-2 border-blue-400 pl-4">
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    ))}
  </div>
);

export default function Loading() {
  return (
    <div>
      <PageInfoSkeleton />
      <FeedbackFormSkeleton />
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-4 w-20" />
        </div>
        <PublicFeedbackSkeleton />
      </div>
    </div>
  );
} 