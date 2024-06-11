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
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

type pageProps = {
  params: { slug: string; lang: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export const metadata = {
  title: 'Images — Scenes that I stumbled upon',
  description:
    'I like to walk around and take pictures of things that I find interesting.',
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
    : cookies().get('lang')?.value ?? 'en';

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
        footer={
          <>
            <TagContainer>
              {tagsWithLink.map((tag) => (
                <Link
                  href={`/${params.lang}/${pageName}?${
                    pageNumber ? `page=${pageNumber}` : ''
                  }&category=${tag.path}`}
                  key={tag.name}
                >
                  <Tag
                    className={
                      category === tag.name
                        ? 'border-slate-800'
                        : 'border-slate-200'
                    }
                  >
                    {tag.name}
                  </Tag>
                </Link>
              ))}
            </TagContainer>
          </>
        }
      />
      <div className="w-full">
        <div className="columns-4 gap-4 sm:columns-1 [&>img:not(:first-child)]:mt-4">
          {images.map((image) => (
            <CustomImage
              src={image.src}
              alt={image.alt}
              key={image.id}
              height={300}
              width={500}
              sizes="500px"
              className="h-full w-full rounded-md"
              link={`/${params.lang}/images/${image.id}`}
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
