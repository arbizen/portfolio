import { headerItems } from '@/data/header';
import Image from 'next/image';
import Link from 'next/link';
import HeaderItem from './header-item';

export default function Header() {
  return (
    <header className="p-4 border border-blue-100 rounded-lg flex items-center justify-between relative z-50 bg-transparent backdrop-blur-sm bg-opacity-10">
      <div className="flex gap-4 items-center">
        <Image
          className="rounded-full"
          src="/arb.png"
          alt="A professional potrait of Arb Rahim Badsa"
          height={50}
          width={50}
        />
        <h1 className="font-medium text-2xl">Arb.</h1>
      </div>
      <menu className="flex gap-8">
        {headerItems.map((item) => (
          <HeaderItem key={item.route} route={item.route} name={item.name} />
        ))}
      </menu>
    </header>
  );
}
