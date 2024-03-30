import { Menu } from 'lucide-react';
import HeaderItem from './header-item';
import { headerItems } from '@/data/header';

export default function MobileMenu() {
  return (
    <div className="hidden sm:block relative h-auto w-full border-b border-blue-100 z-50 bg-transparent backdrop-blur-sm bg-opacity-10">
      <div className="flex items-start p-6 gap-6 overflow-x-scroll">
        {headerItems.map((item) => (
          <HeaderItem key={item.route} route={item.route} name={item.name} />
        ))}
      </div>
    </div>
  );
}
