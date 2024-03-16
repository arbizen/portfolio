import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}
export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'p-4 border border-blue-100 rounded-2xl relative z-50 bg-transparent backdrop-blur-sm bg-opacity-10',
        className,
      )}
    >
      {children}
    </div>
  );
}
