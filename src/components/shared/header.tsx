import { SITE_NAME, headerItems } from '@/data/header';
import Image from 'next/image';
import Link from 'next/link';
import HeaderItem from './header-item';
import { cn } from '@/lib/utils';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header({
  className,
  data,
}: {
  className?: string;
  data: any;
}) {
  return (
    <header
      className={cn(
        'p-4 border border-blue-100 rounded-lg flex items-center justify-between relative z-50 bg-transparent backdrop-blur-sm bg-opacity-10',
        className,
      )}
    >
      <div className="flex gap-4 items-center">
        <Image
          className="rounded-full"
          src="/arb.png"
          alt="A professional potrait of Arb Rahim Badsa"
          height={50}
          width={50}
        />
        <h1 className="font-medium text-2xl leading-tight sm:text-xl">
          <Link href={data.siteName.url}>{data.siteName.text}</Link>
        </h1>
      </div>
      <menu className="flex gap-8 sm:hidden">
        {data.nav.map((item: any) => (
          <HeaderItem key={item.url} route={item.url} name={item.name} />
        ))}
      </menu>
      <menu className="flex gap-8">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="p-2 hover:bg-slate-100 text-slate-800 rounded cursor-pointer sm:cursor-auto">
              <Globe size={20} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Languages</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/en">
                <DropdownMenuItem>
                  <span>English</span>
                  <DropdownMenuShortcut>en</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
              <Link href="/es">
                <DropdownMenuItem>
                  <span>Spanish</span>
                  <DropdownMenuShortcut>es</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
              <Link href="/bn">
                <DropdownMenuItem>
                  <span>বাংলা</span>
                  <DropdownMenuShortcut>bn</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </DropdownMenuContent>
          <DropdownMenuPortal />
        </DropdownMenu>
      </menu>
    </header>
  );
}
