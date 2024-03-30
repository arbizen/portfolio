import { Menu } from 'lucide-react';
import HeaderItem from './header-item';
import { headerItems } from '@/data/header';

export default function MobileMenu() {
  return (
    <>
      {/* <menu className="hidden gap-8 sm:flex hover:bg-slate-100 rounded-md p-2">
        <Menu size={24} />
      </menu> */}
      <div className="hidden absolute top-[100%] h-[64px] left-0 w-full border-b border-blue-100 sm:flex items-start p-4 pt-5 gap-6 overflow-x-scroll z-50 bg-transparent backdrop-blur-sm bg-opacity-10">
        {headerItems.map((item) => (
          <HeaderItem key={item.route} route={item.route} name={item.name} />
        ))}
      </div>
    </>
  );
}
