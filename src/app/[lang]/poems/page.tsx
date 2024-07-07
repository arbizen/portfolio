import PageInfo from '@/components/shared/page-info';
import PageTitle from '@/components/shared/page-title';
import { getDictionary } from '../dictionaries';
import Breadcumb from '@/components/shared/breadcumb';
import PageAnimation from '@/components/page-animation';
import { supportedLocales } from '@/data/site/supportedLocales';
import { cookies } from 'next/headers';

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
  const supportedLang = supportedLocales.includes(params.lang)
    ? params.lang
    : cookies().get('lang')?.value ?? 'en';

  const { page } = await getDictionary(supportedLang);
  return (
    <PageAnimation>
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
      <div className="w-full h-[200px] flex items-center justify-center relative z-50">
        <p className="text-slate-500 text-base">
          This page is under construction. Please check back later!
        </p>
      </div>
    </PageAnimation>
  );
}
