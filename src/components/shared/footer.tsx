'use client';

import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import the RotatingQuote component to avoid SSR issues
const RotatingQuote = dynamic(() => import('@/components/rotating-quote'), {
  ssr: false,
});

export default function Footer({
  text,
  socials,
}: {
  text: string;
  socials: { name: string; link: string }[];
}) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col mt-16 relative z-50">
      <div className="flex justify-between mb-4">
        <RotatingQuote className="italic text-slate-800" />
        <div className="flex gap-4 text-slate-800">
          {socials.map((social, i) => (
            <Link target="_blank" key={i} href={social.link}>
              {social.name === 'Github' ? (
                <Github size={20} />
              ) : social.name === 'Twitter' ? (
                <Twitter size={20} />
              ) : social.name === 'LinkedIn' ? (
                <Linkedin size={20} />
              ) : (
                ''
              )}
            </Link>
          ))}
        </div>
      </div>
      <div className="text-xs text-slate-400 text-center pt-6 border-t border-slate-100">
        © {currentYear} • All rights reserved
      </div>
    </footer>
  );
}
