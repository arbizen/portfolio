import { SITE_NAME, headerItems } from '@/data/header';
import Image from 'next/image';
import Link from 'next/link';
import HeaderItem from './header-item';
import { cn } from '@/lib/utils';
import { Globe } from 'lucide-react';

import ClientAnimatePresence from '../client-animate-presence';
import LanguageSelector from './language-selector';

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
        <ClientAnimatePresence>
          {data.nav.map((item: any) => (
            <HeaderItem key={item.url} route={item.url} name={item.name} />
          ))}
        </ClientAnimatePresence>
      </menu>
      <menu className="flex gap-8">
        <LanguageSelector />
      </menu>
    </header>
  );
}
