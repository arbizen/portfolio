import React from 'react';

interface PageInfoProps {
  header?: React.ReactNode;
  description?: string;
  footer?: React.ReactNode;
  itemsLength?: number;
  breadcumb?: React.ReactNode;
}

/** A page's title, one line about it, and its filters: nothing more. */
export default function PageInfo({ header, description, footer, itemsLength, breadcumb }: PageInfoProps) {
  return (
    <div className="mb-10 flex flex-col gap-3">
      {breadcumb ? <div className="mb-3">{breadcumb}</div> : null}
      <div className="flex items-baseline gap-2">
        {header}
        {itemsLength !== undefined && itemsLength > 0 ? (
          <span className="text-sm tabular-nums text-neutral-500">{itemsLength}</span>
        ) : null}
      </div>
      {description ? <p className="text-[15px] leading-relaxed text-neutral-500">{description}</p> : null}
      {footer ? <div className="mt-1">{footer}</div> : null}
    </div>
  );
}
