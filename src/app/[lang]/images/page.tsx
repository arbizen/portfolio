import PageInfo from '@/components/shared/page-info';
import PageTitle from '@/components/shared/page-title';
import Breadcumb from '@/components/shared/breadcumb';
import { getDictionary } from '../dictionaries';

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
  const { page } = await getDictionary(params.lang);
  return (
    <div>
      <PageInfo
        breadcumb={
          <Breadcumb
            firstNav={{
              name: page.home.name.third,
              url: `/${params.lang}`,
            }}
            secondNav={{
              name: page.images.name,
              url: `/${params.lang}/images`,
            }}
          />
        }
        header={<PageTitle title={page.images.name} />}
        description={page.images.description}
      />
    </div>
  );
}
