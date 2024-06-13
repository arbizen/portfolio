'use client';
import Link from 'next/link';
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
import { usePathname, useSearchParams } from 'next/navigation';
import { supportedLocales } from '@/data/site/supportedLocales';
export default function LanguageSelector() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const pathWithoutLocale = pathName.replace(/\/[a-z]{2}/, '');
  const locales = [
    { name: 'English', code: 'en' },
    { name: 'Spanish', code: 'es' },
    { name: 'বাংলা', code: 'bn' },
  ];
  return (
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
          {locales.map((locale) => (
            <Link
              href={`/${locale.code}${pathWithoutLocale}${
                id ? `?id=${id}` : ''
              }`}
              key={locale.code}
            >
              <DropdownMenuItem>
                <span>{locale.name}</span>
                <DropdownMenuShortcut>{locale.code}</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
      <DropdownMenuPortal />
    </DropdownMenu>
  );
}
