import { redirect } from 'next/navigation';
import Breadcumb from '@/components/shared/breadcumb';
import { Metadata, ResolvingMetadata } from 'next';
import Pagination from '@/lib/Pagination';
import { ImageType } from '@/types';
import { coverUrl, notionManager } from '@/lib/NotionManager';
import PageInfo from '@/components/shared/page-info';
import PageTitle from '@/components/shared/page-title';
import Badge from '@/components/ui/badge';
// @ts-ignore
import dateformat from 'dateformat';
import Image from 'next/image';
import HeartReaction from '@/components/heart-reaction';


// Each image page is built on its first visit, then served from the cache.
export async function generateStaticParams() {
  return [];
}

type Props = {
  params: { id: string; lang: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = params.id;
  const page = (await notionManager.getPageById(id)) as any;
  const firstImage = {
    id: page.id,
    alt: page.properties?.name?.title[0]?.plain_text || '',
    src:
      coverUrl(page) ||
      '/en/opengraph-image.png',
    date: page.properties?.createdAt?.created_time || '',
    reactions: page.properties?.reactions?.number || 0,
    categories: page.properties.category
      ? // @ts-ignore
        page.properties.category.multi_select.map((tag: string) => tag.name)
      : [],
    description: page.properties?.description?.rich_text[0]?.plain_text || '',
  };
  const src = firstImage.src;
  return {
    title: firstImage.alt || 'Image',
    description: 'A photo by Arbizen: a scene that caught my eye and would not let go.',
    alternates: { canonical: `/en/images/${params.id}` },
    openGraph: {
      title: firstImage.alt || 'Images — Scenes that I stumbled upon',
      description:
        'A photo by Arbizen: a scene that caught my eye and would not let go.',
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

export default async function Share({ params }: Props) {
  const id = params.id;
  const page = (await notionManager.getPageById(id)) as any;
  const image = {
    id: page.id,
    alt: page.properties?.name?.title[0]?.plain_text || '',
    src:
      coverUrl(page) ||
      '/en/opengraph-image.png',
    date: page.properties?.createdAt?.created_time || '',
    reactions: page.properties?.reactions?.number || 0,
    categories: page.properties.category
      ? // @ts-ignore
        page.properties.category.multi_select.map((tag: string) => tag.name)
      : [],
    description: page.properties?.description?.rich_text[0]?.plain_text || '',
  };

  return (
    <section>
      <PageInfo
        breadcumb={
          <Breadcumb
            firstNav={{ name: 'Home', url: `/${params.lang}` }}
            secondNav={{ name: 'Images', url: `/${params.lang}/images` }}
            current={image.alt}
          />
        }
        header={<PageTitle title={image.alt} />}
        description={image.description && image.description}
        footer={
          <div className="flex gap-2 items-center justify-between sm:flex-wrap">
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
            
            {/* Heart Reaction */}
            <HeartReaction 
              imageId={image.id} 
              initialReactions={image.reactions}
              size="md"
            />
          </div>
        }
      />
      <div className="mt-8 flex justify-center relative z-50">
        <div className="img-placeholder">
          <Image
            unoptimized
            src={image.src}
            alt={image.alt}
            width={1200}
            height={1600}
            className="h-auto w-full rounded-md"
            priority
          />
        </div>
      </div>
      <div className="my-4 mt-2 flex justify-center items-center gap-2">
        <p className="text-sm italic text-slate-500">
          {image.alt}
        </p>
        <span className="text-xs text-slate-500">
          ({dateformat(image.date, 'dd/mm/yyyy')})
        </span>
      </div>
    </section>
  );
}
