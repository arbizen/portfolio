import React from 'react';
import { Skeleton } from '../ui/skeleton';
export default function PageInfoSkeleton() {
  return (
    <div className="flex flex-col my-16 pl-[60px] gap-8 max-w-[860px] sm:pl-[15px] sm:gap-4 sm:mt-8 sm:mb-8">
      <Skeleton className="h-4 w-[100px] rounded-md" />
      <div className="flex flex-col gap-4 sm:gap-2">
        <Skeleton className="h-8 w-[200px] rounded-md" />
        <div className="text-[20px] text-slate-800 leading-tight">
          <Skeleton className="h-16 w-[860px] rounded-md" />
        </div>
      </div>
      <Skeleton className="h-4 w-[100px] rounded-md" />
    </div>
  );
}
