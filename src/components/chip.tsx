import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const chipVariants = cva(
  'flex gap-1 px-2 py-1 rounded items-center border text-sm font-medium',
  {
    variants: {
      color: {
        green: 'border-green-300 text-green-500',
        blue: 'border-blue-300 text-blue-500',
      },
    },
  },
);

const circleVariants = cva('h-[5px] w-[5px] rounded-full', {
  variants: {
    color: {
      green: 'bg-green-500',
      blue: 'bg-blue-500',
    },
  },
});

export default function Chip({
  children,
  color,
}: {
  children: React.ReactNode;
  color: 'green' | 'blue';
}) {
  return (
    <div className={cn(chipVariants({ color }))}>
      <div className={cn(circleVariants({ color }))}></div>
      {children}
    </div>
  );
}
