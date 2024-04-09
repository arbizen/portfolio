import { cn } from '@/lib/utils';

export function TagContainer({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex gap-5 flex-wrap sm:overflow-x-scroll hide-scrollbar sm:gap-3">
      {children}
    </div>
  );
}

export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded text-base sm:text-sm leading-tight border-slate-200 hover:border-slate-800 border p-2.5 sm:p-1.5 sm:px-2 cursor-pointer',
        className,
      )}
    >
      {children}
    </div>
  );
}
