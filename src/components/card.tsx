import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

/** A quiet surface for the few things that need one (forms, feedback). */
export default function Card({ children, className }: CardProps) {
  return <div className={cn('rounded-lg border border-neutral-100 p-4', className)}>{children}</div>;
}
