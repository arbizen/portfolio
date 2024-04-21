'use client';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Card from '../card';
import { useRouter } from 'next/navigation';

interface PaginationNavigationProps {
  nextPageLink?: string;
}

export default function PaginationNavigation({
  nextPageLink,
}: PaginationNavigationProps) {
  const router = useRouter();
  return (
    <div className="w-full flex justify-center">
      <Card className="inline-flex gap-6 mt-8">
        <div
          onClick={() => router.back()}
          className="flex items-center gap-1 text-xs font-bold leading-tight text-blue-500 hover:underline cursor-pointer"
        >
          <ArrowLeft size={15} />
          Previous
        </div>
        <Link
          href={nextPageLink!}
          className="flex items-center gap-1 text-xs font-bold leading-tight text-blue-500 hover:underline"
        >
          Next
          <ArrowRight size={15} />
        </Link>
      </Card>
    </div>
  );
}
