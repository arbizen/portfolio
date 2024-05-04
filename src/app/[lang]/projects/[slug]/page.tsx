import { notionManager } from '@/lib/NotionManager';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css';
import CodeBlock from '@/components/markdown/Code';
import Pre from '@/components/markdown/Pre';
import Image from '@/components/markdown/Image';
import Paragraph from '@/components/markdown/Paragraph';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import PageInfo from '@/components/shared/page-info';
import PageTitle from '@/components/shared/page-title';
import Badge from '@/components/ui/badge';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

// @ts-ignore
import dateformat from 'dateformat';
import PageAnimation from '@/components/page-animation';

export const dynamic = 'force-dynamic';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = searchParams?.id as string;
  const decodedSlug = decodeURIComponent(params.slug);

  const extractedId = decodedSlug.split('#')?.[1];

  if (!extractedId && !id) {
    return {
      title: 'Project',
      description: 'Description',
      openGraph: {
        title: 'Project',
        description: 'Description',
        images: [
          'https://source.unsplash.com/a-person-standing-on-top-of-a-mountain-nMzbnMzMjYU',
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Project',
        description: 'Description',
        creator: '@arbizzen',
        images: [
          'https://source.unsplash.com/a-person-standing-on-top-of-a-mountain-nMzbnMzMjYU',
        ], // Must be an absolute URL
      },
    };
  }

  const pageInfo = await notionManager.getPageById(id || extractedId);

  const coverUrl =
    (pageInfo as any)?.cover?.external?.url ||
    (pageInfo as any).cover?.file?.url ||
    'https://source.unsplash.com/a-person-standing-on-top-of-a-mountain-nMzbnMzMjYU';
  const title =
    (pageInfo as any)?.properties?.title?.title[0]?.plain_text || 'Project';
  const description =
    (pageInfo as any)?.properties?.description?.rich_text[0]?.plain_text ||
    'Description';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [coverUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@arbizzen',
      images: [coverUrl], // Must be an absolute URL
    },
  };
}

export default async function ProjectPage({
  params,
  searchParams,
}: {
  params: { slug: string; lang: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const id = searchParams?.id as string;
  const decodedSlug = decodeURIComponent(params.slug);

  const extractedId = decodedSlug.split('#')?.[1];

  if (!extractedId && !id) {
    return notFound();
  }
  const mdString = await notionManager.getMdStringById(id || extractedId);

  const pageInfo = await notionManager.getPageById(id || extractedId);
  const coverUrl =
    (pageInfo as any)?.cover?.external?.url ||
    (pageInfo as any).cover?.file?.url ||
    'https://source.unsplash.com/a-person-standing-on-top-of-a-mountain-nMzbnMzMjYU';
  const title =
    (pageInfo as any)?.properties?.name?.title[0]?.plain_text || 'Project name';
  const description =
    (pageInfo as any)?.properties?.description?.rich_text[0]?.plain_text ||
    'Description';
  const type =
    (pageInfo as any).properties?.type?.rich_text[0]?.plain_text || '';
  const date = (pageInfo as any)?.properties?.createdAt?.created_time || '';

  const customComponents = {
    code: CodeBlock,
    pre: Pre,
    img: Image,
    p: Paragraph,
  };

  return (
    <PageAnimation>
      <PageInfo
        header={<PageTitle title={title} />}
        description={description}
        footer={
          <div className="flex gap-2">
            <Badge className="bg-orange-100 text-orange-500">
              {dateformat(date, 'ddS mmmm, yyyy')}
            </Badge>
            <Badge className="bg-red-100 text-red-500">{type}</Badge>
          </div>
        }
      />
      <div className="flex flex-col">
        <Image
          src={coverUrl}
          alt={title}
          className="max-h-[800px] object-cover rounded-md"
        />
        <article className="flex justify-center mt-16 min-w-[800px] sm:min-w-full">
          <Markdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex, rehypeAutolinkHeadings]}
            components={customComponents}
            className="prose w-full min-w-[800px] sm:min-w-full"
          >
            {mdString}
          </Markdown>
        </article>
      </div>
    </PageAnimation>
  );
}
