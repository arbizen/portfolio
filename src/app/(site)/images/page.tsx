import PageInfo from '@/components/shared/page-info';
import PageTitle from '@/components/shared/page-title';
import Breadcumb from '@/components/shared/breadcumb';
import { getDictionary } from '../dictionaries';
import { Tag, TagContainer } from '@/components/tag';
import { ImageType } from '@/types';
import CustomImage from '@/components/gallery-image';
import Pagination from '@/lib/Pagination';
import Link from 'next/link';
import PaginationNavigation from '@/components/shared/pagination-navigation';
import PageAnimation from '@/components/page-animation';


type pageProps = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export const metadata = {
  title: 'Images',
  description: 'Photography by Arbizen: everyday scenes of nature, cities, villages and quiet moments.',
  alternates: { canonical: '/images' },
  openGraph: { title: 'Images', description: 'Photography by Arbizen: everyday scenes of nature, cities, villages and quiet moments.', url: '/images', images: ['/opengraph-image.png'] },
};

export default async function Images({ params }: pageProps) {

  const pageName = `images`;
  const pagination = new Pagination({ limit: 100 }, pageName);
  const data = await pagination.getCurrentPageData('desc');

  const images: ImageType[] = data[pageName]?.data;
  const nextPageUrl = pagination.nextPageUrl(data);

  const tagsWithLink = [
    { name: 'All', path: 'All' },
    { name: 'Nature', path: 'Nature' },
    { name: 'City', path: 'City' },
    { name: 'Village', path: 'Village' },
    { name: 'Archaic', path: 'Archaic' },
  ];

  const { page: dictionaryPage } = await getDictionary('en');

  return (
    <PageAnimation>
      <PageInfo
        breadcumb={
          <Breadcumb
            firstNav={{
              name: dictionaryPage.home.name.third,
              url: '/',
            }}
            secondNav={{
              name: dictionaryPage.images.name,
              url: `/images`,
            }}
          />
        }
        itemsLength={images.length}
        header={<PageTitle title={dictionaryPage.images.name} />}
        description={dictionaryPage.images.description}
      />
      <div className="w-full relative z-50">
        <div className="columns-2 gap-4 sm:columns-1">
          {images.map((image) => (
            <CustomImage
              src={image.src}
              alt={image.alt}
              key={image.id}
              height={300}
              width={500}
              className="h-full w-full"
              link={`/images/${image.id}`}
              date={image.date}
              reactions={image.reactions}
              imageId={image.id}
            />
          ))}
        </div>
        {images.length > 24 && (
          <PaginationNavigation nextPageLink={nextPageUrl} />
        )}
      </div>
    </PageAnimation>
  );
}
