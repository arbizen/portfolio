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
  params: { id: string; lang: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = params.id;
  const page = (await notionManager.getPageById(id)) as any;
  const firstImage = {
    id: page.id,
    alt: page.properties?.name?.title[0]?.plain_text || '',
    src:
      page.cover?.external?.url ||
      page.cover?.file?.url ||
      'https://source.unsplash.com/a-person-standing-on-top-of-a-mountain-nMzbnMzMjYU',
    date: page.properties?.createdAt?.created_time || '',
    categories: page.properties.category
      ? // @ts-ignore
        page.properties.category.multi_select.map((tag: string) => tag.name)
      : [],
    description: page.properties?.description?.rich_text[0]?.plain_text || '',
  };
  const src = firstImage.src;
  return {
    title: firstImage.alt || 'Images — Scenes that I stumbled upon',
    description:
      'Scenes that attracted my soul and pinned my eyes to them. I love to capture the moments that I find beautiful.',
    openGraph: {
      title: firstImage.alt || 'Images — Scenes that I stumbled upon',
      description:
        'Scenes that attracted my sould and pinned my eyes to them. I love to capture the moments that I find beautiful.',
      images: [src],
      url: process.env.NEXT_PUBLIC_API_URL + `/${params.lang}/images/${id}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: firstImage.alt || 'Images — Scenes that I stumbled upon',
      description:
        'Scenes that attracted my soul and pinned my eyes to them. I love to capture the moments that I find beautiful.',
      creator: '@arbizzen',
      images: [src], // Must be an absolute URL
    },
  };
}

export default async function Share({ params, searchParams }: Props) {
  const id = params.id;
  const page = (await notionManager.getPageById(id)) as any;
  const image = {
    id: page.id,
    alt: page.properties?.name?.title[0]?.plain_text || '',
    src:
      page.cover?.external?.url ||
      page.cover?.file?.url ||
      'https://source.unsplash.com/a-person-standing-on-top-of-a-mountain-nMzbnMzMjYU',
    date: page.properties?.createdAt?.created_time || '',
    categories: page.properties.category
      ? // @ts-ignore
        page.properties.category.multi_select.map((tag: string) => tag.name)
      : [],
    description: page.properties?.description?.rich_text[0]?.plain_text || '',
  };

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
          unoptimized
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
