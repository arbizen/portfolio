import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer({
  text,
  socials,
}: {
  text: string;
  socials: { name: string; link: string }[];
}) {
  return (
    <footer className="flex mt-16 justify-between relative z-50">
      <p className=" italic text-slate-800">{text}</p>
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
    </footer>
  );
}
