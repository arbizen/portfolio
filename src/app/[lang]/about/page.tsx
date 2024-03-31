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
  title: 'About — A little about me',
  description: 'This is the about page',
};

export default async function About({ params, searchParams }: pageProps) {
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
              name: page.about.name,
              url: `/${params.lang}/about`,
            }}
          />
        }
        header={<PageTitle title={page.about.name} />}
        description={page.about.description}
      />
    </div>
  );
}
