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
import { supportedLocales } from '@/data/site/supportedLocales';


type pageProps = {
  params: { slug: string; lang: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export const metadata = {
  title: 'Images',
  description: 'Photos Arbizen took of everyday scenes: nature, cities, villages and quiet moments.',
  alternates: { canonical: '/en/images' },
  openGraph: { title: 'Images', description: 'Photos Arbizen took of everyday scenes: nature, cities, villages and quiet moments.', url: '/en/images' },
};

export default async function Images({ params, searchParams }: pageProps) {
  const category = searchParams?.category || '';
  const pageNumber = searchParams?.page || 1;

  const pageName = `images`;
  const pagination = new Pagination(searchParams, pageName);
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

  const supportedLang = supportedLocales.includes(params.lang)
    ? params.lang
    : 'en';

  const { page: dictionaryPage } = await getDictionary(supportedLang);

  return (
    <PageAnimation>
      <PageInfo
        breadcumb={
          <Breadcumb
            firstNav={{
              name: dictionaryPage.home.name.third,
              url: `/${params.lang}`,
            }}
            secondNav={{
              name: dictionaryPage.images.name,
              url: `/${params.lang}/images`,
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
              link={`/${params.lang}/images/${image.id}`}
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
