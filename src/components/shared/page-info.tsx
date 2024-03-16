import React from 'react';
import Breadcumb from './breadcumb';
import PageInfoSkeleton from './page-info-skeleton';
import Badge from '../ui/badge';

interface PageInfoProps {
  header?: React.ReactNode;
  description?: string;
  footer?: React.ReactNode;
  itemsLength?: number;
}
export default function PageInfo({
  header,
  description,
  footer,
  itemsLength,
}: PageInfoProps) {
  return (
    <div className="flex flex-col my-16 pl-[60px] gap-8 max-w-[860px]">
      <Breadcumb />
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          {header}
          {itemsLength !== 0 && (
            <Badge className="bg-red-100 text-red-500">{itemsLength}</Badge>
          )}
        </div>
        <p className="text-[20px] text-slate-800 leading-tight">
          {description}
        </p>
      </div>
      {footer}
    </div>
  );
}
