import PageInfoSkeleton from '@/components/shared/page-info-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

const ProfileSkeleton = () => (
  <div className="flex items-center flex-col gap-8 sm:gap-4 relative z-50">
    {/* Profile image */}
    <Skeleton className="w-[100px] h-[100px] rounded-full" />
    
    {/* Name and title section */}
    <div className="text-center">
      <Skeleton className="h-8 w-48 mb-2 mx-auto sm:h-6" />
      <Skeleton className="h-4 w-64 mb-4 mx-auto sm:w-48" />
      
      {/* Location and time */}
      <div className="flex items-center gap-4 justify-center text-sm sm:flex-wrap">
        <div className="flex gap-1.5 items-center">
          <Skeleton className="w-4 h-4 rounded" />
          <Skeleton className="w-32 h-4" />
        </div>
        <div className="flex gap-1.5 items-center">
          <Skeleton className="w-4 h-4 rounded" />
          <Skeleton className="w-16 h-4" />
        </div>
      </div>
      
      {/* Resume buttons */}
      <div className="flex gap-3 mt-6 justify-center sm:flex-col sm:items-center">
        <Skeleton className="h-12 w-36 rounded-lg" />
        <Skeleton className="h-12 w-40 rounded-lg" />
      </div>
    </div>
  </div>
);

const MarkdownContentSkeleton = () => (
  <article className="flex justify-center mt-8 sm:mt-8 min-w-[800px] sm:min-w-full">
    <div className="p-8 text-slate-800 sm:p-4 border border-blue-100 rounded-md w-full">
      {/* Simulate markdown content with various paragraph sizes */}
      <div className="prose w-full min-w-[800px] sm:min-w-full space-y-6">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
        
        <div className="space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-6 w-2/3" />
        </div>
        
        <div className="space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-4/5" />
        </div>
        
        <div className="space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-5/6" />
        </div>
      </div>
    </div>
  </article>
);

export default function Loading() {
  return (
    <div>
      <PageInfoSkeleton />
      <ProfileSkeleton />
      <MarkdownContentSkeleton />
    </div>
  );
} 