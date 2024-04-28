import { redirect } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import Pagination from '@/lib/Pagination';
import { ImageType } from '@/types';

export const dynamic = 'force-dynamic';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const pageName = `images`;
  const pagination = new Pagination(searchParams, pageName);
  const data = await pagination.getCurrentPageData('desc');

  const images: ImageType[] = data[pageName]?.data;
  const firstImage = images[0];
  const src = firstImage.src;
  return {
    title: firstImage.alt || 'Images — Scenes that I stumbled upon',
    description:
      'Scenes that attracted my sould and pinned my eyes to them. I love to capture the moments that I find beautiful.',
    openGraph: {
      title: firstImage.alt || 'Images — Scenes that I stumbled upon',
      description:
        'Scenes that attracted my sould and pinned my eyes to them. I love to capture the moments that I find beautiful.',
      images: [src],
    },
    twitter: {
      card: 'summary_large_image',
      title: firstImage.alt || 'Images — Scenes that I stumbled upon',
      description:
        'Scenes that attracted my sould and pinned my eyes to them. I love to capture the moments that I find beautiful.',
      creator: '@arbizzen',
      images: [src], // Must be an absolute URL
    },
  };
}

export default function Share() {
  redirect('/images');
}
