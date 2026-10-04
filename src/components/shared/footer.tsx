import Link from 'next/link';

export default function Footer({
  socials,
}: {
  text?: string;
  socials: { name: string; link: string }[];
}) {
  return (
    <footer className="mt-24 flex items-center justify-between gap-4 border-t border-neutral-100 pt-6 text-sm text-neutral-500">
      <div className="flex gap-4">
        {socials.map((social) => (
          <Link
            key={social.link}
            href={social.link}
            target="_blank"
            className="transition-colors hover:text-neutral-900"
          >
            {social.name === 'Twitter' ? 'X' : social.name === 'Github' ? 'GitHub' : social.name}
          </Link>
        ))}
      </div>
      <span>© {new Date().getFullYear()}</span>
    </footer>
  );
}
