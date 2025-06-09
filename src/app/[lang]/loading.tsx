import PageInfoSkeleton from '@/components/shared/page-info-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

const FeedbackCallToActionSkeleton = () => (
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

const SkillBeamSkeleton = () => (
  <div className="w-full">
    <div className="relative flex h-[350px] sm:h-[300px] sm:mb-20 items-center justify-center overflow-hidden w-full">
      <div className="flex size-full flex-col max-w-lg max-h-[200px] items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Skeleton className="size-14 rounded-full" />
          <Skeleton className="size-14 rounded-full" />
        </div>
        <div className="flex flex-row items-center justify-between">
          <Skeleton className="size-14 rounded-full" />
          <Skeleton className="size-16 rounded-full" />
          <Skeleton className="size-14 rounded-full" />
        </div>
        <div className="flex flex-row items-center justify-between">
          <Skeleton className="size-14 rounded-full" />
          <Skeleton className="size-14 rounded-full" />
        </div>
      </div>
    </div>
  </div>
);

const FeedbackSkeleton = () => (
  <div className="mb-8">
    <div className="flex items-center justify-between mb-6">
      <Skeleton className="h-6 w-64" />
      <Skeleton className="h-4 w-20" />
    </div>
    <div className="space-y-6">
      {[1, 2, 3].map((_, i) => (
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
  </div>
);

const ActivitySkeleton = () => (
  <div>
    <div className="flex items-center justify-between mb-16">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-4 w-28" />
    </div>
    <section className="pt-[64px] flex flex-col gap-4 sm:pt-[32px]">
      {[1, 2, 3, 4, 5].map((_, i) => (
        <div key={i} className="px-6 py-[20px] border border-blue-100 rounded-md">
          <Skeleton className="h-4 w-64 mb-1" />
          <div className="flex gap-2 mt-1 items-center">
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-5 w-16 rounded" />
          </div>
        </div>
      ))}
    </section>
  </div>
);

const BlogSkeleton = () => (
  <div className="p-16 sm:p-8 border border-blue-100 rounded-md">
    <div className="flex gap-8 sm:flex-col">
      <Skeleton className="w-[360px] h-[240px] rounded-md sm:w-full" />
      <div className="flex flex-col gap-6 flex-1">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Skeleton className="w-20 h-5" />
            <Skeleton className="w-20 h-5" />
          </div>
          <Skeleton className="w-40 h-5" />
        </div>
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-16" />
        <div className="flex justify-between">
          <Skeleton className="w-20 h-5" />
        </div>
      </div>
    </div>
  </div>
);

const BlogsSkeleton = () => (
  <div>
    <div className="mt-8 flex items-center justify-between mb-8">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-4 w-20" />
    </div>
    <div className="flex flex-col gap-4">
      <BlogSkeleton />
      <BlogSkeleton />
    </div>
  </div>
);

const ImagesSkeleton = () => (
  <div>
    <div className="mt-8 flex items-center justify-between mb-8">
      <Skeleton className="h-6 w-16" />
      <Skeleton className="h-4 w-24" />
    </div>
    <div className="mt-8 w-full">
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-1">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="break-inside-avoid mb-4">
            <Skeleton className="w-full aspect-[4/3] rounded-md" />
            <div className="mt-2 flex justify-between items-center">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function Loading() {
  return (
    <div>
      {/* Home page layout skeleton */}
      <div className="flex items-start w-full sm:flex-wrap">
        <PageInfoSkeleton />
        {/* <SkillBeamSkeleton /> */}
      </div>

      <FeedbackCallToActionSkeleton />
      <FeedbackSkeleton />
      <ActivitySkeleton />
      <BlogsSkeleton />
      <ImagesSkeleton />
    </div>
  );
}
