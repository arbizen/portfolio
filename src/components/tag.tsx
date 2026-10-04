import { cn } from '@/lib/utils';

export function TagContainer({ children }: { children?: React.ReactNode }) {
  return <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm">{children}</div>;
}

/** A filter, as plain text: the chosen one is dark and underlined. */
export function Tag({
  children,
  className,
  active,
}: {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}) {
  // Callers mark the chosen tag with a dark border class; read it as active.
  const isActive = active ?? Boolean(className?.includes('border-slate-800'));
  return (
    <span
      className={cn(
        'cursor-pointer transition-colors',
        isActive ? 'text-neutral-900 underline underline-offset-4' : 'text-neutral-500 hover:text-neutral-900',
      )}
    >
      {children}
    </span>
  );
}
