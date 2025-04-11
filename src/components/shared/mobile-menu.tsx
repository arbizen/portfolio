'use client';

import { Menu } from 'lucide-react';
import HeaderItem from './header-item';
import ClientAnimatePresence from '../client-animate-presence';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LanguageSelector from './language-selector';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter,
  SheetClose
} from '../ui/sheet';

export default function MobileMenu({ data }: { data: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  
  const handleNavClick = (url: string) => {
    setIsOpen(false);
    router.push(url);
  };
  
  return (
    <div className="hidden sm:block relative h-auto w-full border-b border-blue-100 z-50 bg-transparent backdrop-blur-sm bg-opacity-10 p-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <Image
            className="rounded-full"
            src="/arb.png"
            alt="A professional portrait of Arb Rahim Badsa"
            height={40}
            width={40}
          />
          <h1 className="font-medium text-xl leading-tight">
            <Link href={data.siteName.url}>{data.siteName.text}</Link>
          </h1>
        </div>
        
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger aria-label="Menu" className="p-2 hover:bg-slate-100 text-slate-800 rounded-full">
            <Menu size={24} />
          </SheetTrigger>
          <SheetContent side="right" className="pt-10 flex flex-col">
            <SheetHeader className="mb-8 border-b pb-6">
              <div className="flex items-center gap-3 mb-2">
                <Image
                  className="rounded-full"
                  src="/arb.png"
                  alt="A professional portrait of Arb Rahim Badsa"
                  height={36}
                  width={36}
                />
                <SheetTitle>{data.siteName.text}</SheetTitle>
              </div>
            </SheetHeader>
            
            <nav className="flex flex-col gap-6 flex-grow">
              {data.nav.map((item: any) => (
                <div 
                  key={item.url} 
                  className="cursor-pointer" 
                  onClick={() => handleNavClick(item.url)}
                >
                  <HeaderItem route={item.url} name={item.name} />
                </div>
              ))}
            </nav>
            
            <SheetFooter className="mt-auto pt-6 border-t">
              <div className="flex items-center justify-between w-full">
                <span className="text-sm text-slate-500">Language</span>
                <LanguageSelector />
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
