import PageInfoSkeleton from '@/components/shared/page-info-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

const PDFViewerSkeleton = () => (
  <div className="mt-8">
    <div className="relative bg-white rounded-lg shadow-lg border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-6 w-40" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-32 rounded-md" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      </div>
      
      <div className="relative w-full h-[800px] sm:h-[600px] border border-gray-300 rounded overflow-hidden bg-gray-50">
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <Skeleton className="h-4 w-48 mb-3 mx-auto" />
        <div className="flex gap-3 justify-center flex-wrap">
          <Skeleton className="h-10 w-36 rounded-md" />
          <Skeleton className="h-10 w-36 rounded-md" />
        </div>
      </div>
    </div>
  </div>
);

export default function Loading() {
  return (
    <div>
      <PageInfoSkeleton />
      <PDFViewerSkeleton />
    </div>
  );
} 