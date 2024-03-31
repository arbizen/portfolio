import PageInfo from '@/components/shared/page-info';
import PageTitle from '@/components/shared/page-title';
import { getDictionary } from '../dictionaries';
import Breadcumb from '@/components/shared/breadcumb';

export const metadata = {
  title: 'Poems — Lines that I read and loved',
  description: 'This is the home page',
};

export const dynamic = 'force-dynamic';

type pageProps = {
  params: { slug: string; lang: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function Poems({ params, searchParams }: pageProps) {
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
              name: page.poems.name,
              url: `/${params.lang}/poems`,
            }}
          />
        }
        header={<PageTitle title={page.poems.name} />}
        description={page.poems.description}
      />
    </div>
  );
}
