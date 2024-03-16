import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
export default function SubTitle({
  title,
  seeMoreText,
}: {
  title: string;
  seeMoreText: string;
}) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-[20px] font-bold text-slate-800 leading-tight">
        {title}
      </h2>
      <Link
        className="space-x-1 text-blue-500 font-bold text-[12px] flex items-center gap-1"
        href="/"
      >
        {seeMoreText}
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
