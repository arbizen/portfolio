import { Menu } from 'lucide-react';
import HeaderItem from './header-item';
import { headerItems } from '@/data/header';

export default function MobileMenu() {
  return (
    <>
      {/* <menu className="hidden gap-8 sm:flex hover:bg-slate-100 rounded-md p-2">
        <Menu size={24} />
      </menu> */}
      <div className="hidden absolute top-[100%] h-[64px] left-0 w-full border-b border-slate-200 sm:flex items-start p-4 pt-5 gap-6 overflow-x-scroll">
        {headerItems.map((item) => (
          <HeaderItem key={item.route} route={item.route} name={item.name} />
        ))}
      </div>
    </>
  );
}
