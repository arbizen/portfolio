import PageInfoSkeleton from '@/components/shared/page-info-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

const TagsSkeleton = () => (
  <div className="flex gap-2 flex-wrap">
    {['All', 'Nature', 'City', 'Village', 'Archaic'].map((_, i) => (
      <Skeleton key={i} className="h-8 w-16 rounded-full" />
    ))}
  </div>
);

const MasonryImageSkeleton = ({ height }: { height: string }) => (
  <div className="break-inside-avoid mb-4">
    <Skeleton className={`w-full ${height} rounded-md`} />
    <div className="mt-2 flex justify-between items-center">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-3 w-16" />
    </div>
  </div>
);

export default function Loading() {
  const imageSizes = [
    'h-48', 'h-64', 'h-56', 'h-72', 'h-40', 'h-60', 'h-52', 'h-68',
    'h-44', 'h-56', 'h-60', 'h-48', 'h-64', 'h-52', 'h-72', 'h-40'
  ];

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

      {/* Masonry grid layout */}
      <div className="w-full relative z-50">
        <div className="columns-4 gap-4 sm:columns-1">
          {imageSizes.map((height, i) => (
            <MasonryImageSkeleton key={i} height={height} />
          ))}
        </div>
      </div>
    </div>
  );
}
