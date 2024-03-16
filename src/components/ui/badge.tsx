import { cn } from '@/lib/utils';

export default function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'inline-flex items-center px-2 py-1 rounded-2xl text-xs font-medium max-h-[24px]',
        className,
      )}
    >
      {children}
    </div>
  );
}
