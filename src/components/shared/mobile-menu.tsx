import { Menu } from 'lucide-react';
import HeaderItem from './header-item';
import { headerItems } from '@/data/header';
import ClientAnimatePresence from '../client-animate-presence';

export default function MobileMenu({ data }: { data: any }) {
  return (
    <div className="hidden sm:block relative h-auto w-full border-b border-blue-100 z-50 bg-transparent backdrop-blur-sm bg-opacity-10">
      <div className="flex items-start p-6 gap-6 overflow-x-scroll hide-scrollbar justify-around">
        <ClientAnimatePresence>
          {data.nav.map((item: any) => (
            <HeaderItem key={item.url} route={item.url} name={item.name} />
          ))}
        </ClientAnimatePresence>
      </div>
    </div>
  );
}
