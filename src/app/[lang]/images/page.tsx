import PageInfo from '@/components/shared/page-info';
import PageTitle from '@/components/shared/page-title';
import Breadcumb from '@/components/shared/breadcumb';
import { getDictionary } from '../dictionaries';
import { Tag, TagContainer } from '@/components/tag';
import { ImageType } from '@/types';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

type pageProps = {
  params: { slug: string; lang: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export const metadata = {
  title: 'Images — Scenes that I stumbled upon',
  description: 'This is the home page',
};

export default async function Images({ params, searchParams }: pageProps) {
  const start = searchParams?.start || 0;
  const count = searchParams?.count || 25;
  const cursor = searchParams?.cursor || '';
  const page = `images`;
  const url = !cursor
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/data/${page}?start=${start}&count=${count}`
    : `${process.env.NEXT_PUBLIC_API_URL}/api/data/${page}/${cursor}?start=${start}&count=${count}`;
  const res = await fetch(url);
  const data = await res.json();
  const images: ImageType[] = data[page]?.data;
  const pageEnd = data[page]?.end;
  const hasMore = data[page]?.has_more;
  const nextCursor = data[page]?.next_cursor;
  let nextPageUrl;
  if (Number(start) == 100 - Number(count) || cursor) {
    nextPageUrl = `/${page}?cursor=${nextCursor ?? cursor}&start=${
      pageEnd ?? start
    }&count=${count}`;
  } else {
    nextPageUrl = `/${page}?start=${pageEnd ?? start}&count=${count}`;
  }
  const { page: dictionaryPage } = await getDictionary(params.lang);
  return (
    <div>
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
        header={<PageTitle title={dictionaryPage.images.name} />}
        description={dictionaryPage.images.description}
        footer={
          <>
            <TagContainer>
              <Tag>Sun</Tag>
              <Tag>Clouds</Tag>
              <Tag>Mountains</Tag>
              <Tag>Water</Tag>
              <Tag>Greenery</Tag>
            </TagContainer>
          </>
        }
      />
      <div className="w-full">
        <div className="columns-4 gap-4 sm:columns-1 [&>img:not(:first-child)]:mt-4">
          {images.map((image) => (
            <Image
              src={image.src}
              alt={image.alt}
              key={image.id}
              height={2000}
              width={2000}
              className="h-full w-full rounded-md"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
