import React from 'react';
import { Skeleton } from '../ui/skeleton';
export default function PageInfoSkeleton() {
  return (
    <div className="flex flex-col mt-16 pl-[60px] gap-8 max-w-[860px]">
      <Skeleton className="h-4 w-[100px] rounded-md" />
      <div className="flex flex-col gap-4">
        <Skeleton className="h-4 w-[200px] rounded-md" />
        <p className="text-[20px] text-slate-800 leading-tight">
          <Skeleton className="h-4 w-[860px] rounded-md" />
        </p>
      </div>
      <Skeleton className="h-4 w-[100px] rounded-md" />
    </div>
  );
}
