import PageInfo from '@/components/shared/page-info';
import PageTitle from '@/components/shared/page-title';
import Breadcumb from '@/components/shared/breadcumb';
import { getDictionary } from '../dictionaries';
import Image from 'next/image';
import { Clock, LocateIcon, Map, MapPin } from 'lucide-react';
// @ts-ignore
import dateformat from 'dateformat';
import { notionManager } from '@/lib/NotionManager';

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css';
import CodeBlock from '@/components/markdown/Code';
import Pre from '@/components/markdown/Pre';
import MarkDownImage from '@/components/markdown/Image';
import Paragraph from '@/components/markdown/Paragraph';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import Badge from '@/components/ui/badge';
import { Metadata, ResolvingMetadata } from 'next';
import Card from '@/components/card';

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
  const currentTime = new Date();
  const utcTime =
    currentTime.getTime() + currentTime.getTimezoneOffset() * 60000;
  const gmtPlus6Time = new Date(utcTime + 3600000 * 6);
  const mdString = await notionManager.getMdStringById(
    process.env.NEXT_PUBLIC_ABOUT_PAGE_ID!,
  );
  const customComponents = {
    code: CodeBlock,
    pre: Pre,
    img: MarkDownImage,
    p: Paragraph,
  };
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
      />
      <div className="flex items-center flex-col gap-8 sm:gap-4">
        <Image
          src={'/arb.png'}
          alt="Arb Rahim Badsa"
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="">
          <h1 className="w-full text-[32px] sm:text-[24px] font-bold text-center">
            Arb Rahim Badsa
          </h1>
          <p className="text-slate-500 text-balance text-center sm:text-sm sm:px-2">
            A self-taught full-stack Javascript Engineer
          </p>
          <div className="text-slate-500 flex items-center gap-4 mt-2 justify-center text-sm sm:flex-wrap">
            <div className="flex gap-1.5 items-center">
              <MapPin size={15} /> <span>Dhaka, Bangladesh</span>
            </div>
            <div className="flex gap-1.5 items-center">
              <Clock size={13} />{' '}
              <span>{dateformat(gmtPlus6Time, 'h:MM TT')}</span>
            </div>
          </div>
        </div>
      </div>

      <article className="flex justify-center mt-8 sm:mt-8 min-w-[800px] sm:min-w-full">
        <Card className="p-8 text-slate-800 sm:p-4">
          <Markdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex, rehypeAutolinkHeadings]}
            components={customComponents}
            className="prose w-full min-w-[800px] sm:min-w-full"
          >
            {mdString}
          </Markdown>
        </Card>
      </article>
    </div>
  );
}
