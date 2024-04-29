import { redirect } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import Pagination from '@/lib/Pagination';
import { ImageType } from '@/types';
import { notionManager } from '@/lib/NotionManager';
import PageInfo from '@/components/shared/page-info';
import PageTitle from '@/components/shared/page-title';
import Badge from '@/components/ui/badge';
// @ts-ignore
import dateformat from 'dateformat';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

type Props = {
  params: { name: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const name = params.name;
  const removeDash = decodeURIComponent(name);
  console.log(removeDash);
  const firstImage = await notionManager.searchNotionPageWithName(removeDash);
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

export default async function Share({ params, searchParams }: Props) {
  const name = params.name;
  const removeDash = decodeURIComponent(name);
  const image = await notionManager.searchNotionPageWithName(removeDash);
  return (
    <section>
      <PageInfo
        header={<PageTitle title={image.alt} />}
        description={image.description && image.description}
        footer={
          <div className="flex gap-2">
            <Badge className="bg-orange-100 text-orange-500">
              {dateformat(image.date, 'ddS mmmm, yyyy')}
            </Badge>

            {image.categories.map((category: string) => (
              <Badge key={category} className="bg-red-100 text-red-500">
                {category}
              </Badge>
            ))}
          </div>
        }
      />
      <div className="mt-8 flex justify-center">
        <Image
          src={image.src}
          alt={image.alt}
          width={500}
          height={500}
          className="h-auto w-auto rounded-md"
        />
      </div>
      <p className="my-4 mt-2 block text-sm italic text-slate-500 text-center">
        {image.alt}
      </p>
    </section>
  );
}
