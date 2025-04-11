'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeaderItem({
  route,
  name,
}: {
  route: string;
  name: string;
}) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if mobile only on client side
  useEffect(() => {
    setIsMobile(window.innerWidth <= 640);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // For desktop navigation active state
  if (pathname === route && !isMobile) {
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
          className="absolute inset-0 h-full w-full px-4 py-1 z-0 border-b-blue-500 border-b-[1.5px] sm:hidden"
        ></motion.div>
      </motion.div>
    );
  }
  
  // Mobile version in sheet
  if (isMobile) {
    return (
      <Link
        className={`text-lg font-medium transition-colors ${
          pathname === route 
            ? "text-blue-500 relative pl-4 border-l-2 border-blue-500" 
            : "text-slate-700 hover:text-blue-500 pl-4"
        }`}
        href={route}
      >
        {name}
      </Link>
    );
  }
  
  // Desktop version (non-active)
  return (
    <Link
      className="text-slate-600 sm:text-base leading-tight sm:flex-none sm:flex sm:justify-center"
      href={route}
    >
      {name}
    </Link>
  );
}
