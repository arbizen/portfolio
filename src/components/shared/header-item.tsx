'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { motion } from 'framer-motion';

export default function HeaderItem({
  route,
  name,
}: {
  route: string;
  name: string;
}) {
  const pathname = usePathname();
  if (pathname === route) {
    return (
      <motion.div layout className="flex flex-col items-center relative pb-1">
        <Link
          className="text-blue-500 sm:text-slate-900 font-medium sm:text-base leading-tight z-10 relative"
          href={route}
        >
          {name}
        </Link>
        <motion.div
          transition={{ duration: 0.2 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="h-[5px] w-[5px] rounded-full bg-blue-500 gap-1 hidden sm:block"
        ></motion.div>
        <motion.div
          layoutId="selected"
          transition={{
            duration: 0.2,
            type: 'tween',
          }}
          className="absolute inset-0 h-full w-full 0 px-4 py-1 z-0 border-b-blue-500 border-b-[1.5px] sm:hidden"
        ></motion.div>
      </motion.div>
    );
  }
  return (
    <Link
      className="text-slate-600 sm:text-base leading-tight sm:flex-none sm:flex sm:justify-center"
      href={route}
    >
      {name}
    </Link>
  );
}
