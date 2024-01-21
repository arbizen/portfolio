import { cn } from '@/lib/utils';
import { headerItems } from '@/data/header';
import Link from 'next/link';

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        'rounded-md border border-zinc-700 px-4 py-4 mt-6 mx-auto w-auto flex gap-4',
        className,
      )}
    >
      {headerItems.map((item, i) => (
        <Link key={i} href={item.path}>
          {item.name}
        </Link>
      ))}
    </header>
  );
}
