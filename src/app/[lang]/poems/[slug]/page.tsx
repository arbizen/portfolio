import { notionManager, coverUrl as lastingCover } from '@/lib/NotionManager';
import Breadcumb from '@/components/shared/breadcumb';
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

// @ts-ignore
import dateformat from 'dateformat';
import { notFound } from 'next/navigation';
import PageAnimation from '@/components/page-animation';


// Each page is built on its first visit, then served from the cache and
// refreshed in the background (see revalidate in the [lang] layout).
export async function generateStaticParams() {
  return [];
}

type Props = {
  params: { slug: string; lang: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = await notionManager.findIdBySlug('poems', params.slug);

  if (!id) {
    return {
      title: 'Poem',
      description: 'Description',
      openGraph: {
        title: 'Poem',
        description: 'Description',
        images: [
          '/en/opengraph-image.png',
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Poem',
        description: 'Description',
        creator: '@arbizzen',
        images: [
          '/en/opengraph-image.png',
        ], // Must be an absolute URL
      },
    };
  }

  const pageInfo = await notionManager.getPageById(id);

  const coverUrl =
    lastingCover(pageInfo) ||
    '/en/opengraph-image.png';
  const title =
    (pageInfo as any)?.properties?.title?.title[0]?.plain_text || 'Poem';
  const description =
    (pageInfo as any)?.properties?.description?.rich_text[0]?.plain_text ||
    'Description';

  // The page itself is canonical (its id is part of the address).
  const canonical = `/en/poems/${encodeURIComponent(decodeURIComponent(params.slug))}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      url: canonical,
      title,
      description,
      images: [coverUrl],
      type: 'article',
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

export default async function PoemPage({
  params,
}: {
  params: { slug: string; lang: string };
}) {
  const id = await notionManager.findIdBySlug('poems', params.slug);

  if (!id) {
    return notFound();
  }

  const mdString = await notionManager.getMdStringById(id);
  const pageInfo = await notionManager.getPageById(id);
  const coverUrl =
    lastingCover(pageInfo) ||
    '/en/opengraph-image.png';
  const title =
    (pageInfo as any)?.properties?.title?.title[0]?.plain_text || 'Poem';
  const description =
    (pageInfo as any)?.properties?.description?.rich_text[0]?.plain_text ||
    'Description';
  const categories =
    'multi_select' in (pageInfo as any)?.properties.category
      ? (pageInfo as any)?.properties.category.multi_select.map(
          (tag: any) => tag.name,
        )
      : [];
  const author = (pageInfo as any)?.properties?.author?.rich_text[0]?.plain_text || 'Unknown';
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
        breadcumb={
          <Breadcumb
            firstNav={{ name: 'Home', url: `/${params.lang}` }}
            secondNav={{ name: 'Poems', url: `/${params.lang}/poems` }}
            current={title}
          />
        }
        header={<PageTitle title={title} />}
        description={description}
        footer={
          <div className="flex gap-2 flex-wrap">
            <Badge className="bg-orange-100 text-orange-500">
              {dateformat(date, 'ddS mmmm, yyyy')}
            </Badge>
            {author !== 'Unknown' && !/^arb\b/i.test(author.trim()) ? (
              <Badge className="bg-purple-100 text-purple-600">{author}</Badge>
            ) : null}
            {categories.map((category: string) => (
              <Badge key={category} className="bg-red-100 text-red-500">
                {category}
              </Badge>
            ))}
          </div>
        }
      />
      <div className="flex flex-col px-[15px] relative z-50">
        <Image
          src={coverUrl}
          alt={title}
          className="max-h-[800px] object-cover rounded-md"
        />
        <article className="mt-10">
          <Markdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex, rehypeAutolinkHeadings]}
            components={customComponents}
            className="prose prose-neutral max-w-none text-[15px] prose-headings:font-medium prose-strong:font-medium prose-a:decoration-neutral-300 prose-a:underline-offset-4"
          >
            {mdString}
          </Markdown>
        </article>
      </div>
    </PageAnimation>
  );
} 