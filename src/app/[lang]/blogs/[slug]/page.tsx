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

// @ts-ignore
import dateformat from 'dateformat';
import { notFound } from 'next/navigation';

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
  const decodedSlug = decodeURIComponent(params.slug);
  const id = decodedSlug.split('#')?.[1];

  if (!id) {
    notFound();
  }

  const pageInfo = await notionManager.getPageById(id);

  const coverUrl =
    (pageInfo as any)?.cover?.external?.url ||
    (pageInfo as any).cover?.file?.url ||
    'https://source.unsplash.com/a-person-standing-on-top-of-a-mountain-nMzbnMzMjYU';
  const title =
    (pageInfo as any)?.properties?.title?.title[0]?.plain_text || 'Blog';
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

export default async function BlogPage({
  params,
}: {
  params: { slug: string; lang: string };
}) {
  const decodedSlug = decodeURIComponent(params.slug);
  const mdString = await notionManager.getPageBySlug(decodedSlug);
  const pageInfo = await notionManager.getPageById(decodedSlug.split('#')?.[1]);
  const coverUrl =
    (pageInfo as any)?.cover?.external?.url ||
    (pageInfo as any).cover?.file?.url ||
    'https://source.unsplash.com/a-person-standing-on-top-of-a-mountain-nMzbnMzMjYU';
  const title =
    (pageInfo as any)?.properties?.title?.title[0]?.plain_text || 'Blog';
  const description =
    (pageInfo as any)?.properties?.description?.rich_text[0]?.plain_text ||
    'Description';
  const categories =
    'multi_select' in (pageInfo as any)?.properties.category
      ? (pageInfo as any)?.properties.category.multi_select.map(
          (tag: any) => tag.name,
        )
      : [];
  const readTime = (pageInfo as any)?.properties?.readTime?.number || 0;
  const date = (pageInfo as any)?.properties?.createdAt?.created_time || '';

  const customComponents = {
    code: CodeBlock,
    pre: Pre,
    img: Image,
    p: Paragraph,
  };

  return (
    <div>
      <PageInfo
        header={<PageTitle title={title} />}
        description={description}
        footer={
          <div className="flex gap-2">
            <Badge className="bg-orange-100 text-orange-500">
              {dateformat(date, 'ddS mmmm, yyyy')}
            </Badge>
            <Badge className="bg-blue-100 text-blue-500">
              {readTime} min read
            </Badge>
            {categories.map((category: string) => (
              <Badge key={category} className="bg-red-100 text-red-500">
                {category}
              </Badge>
            ))}
          </div>
        }
      />
      <div className="flex flex-col px-[15px]">
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: title,
            image: coverUrl,
            datePublished: date,
            description,
            author: {
              '@type': 'Person',
              name: 'Arb Rahim Badsa',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Arbizen',
              logo: {
                '@type': 'ImageObject',
                url: 'https://avatars.githubusercontent.com/u/34975329?v=4',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id':
                process.env.NEXT_PUBLIC_API_URL +
                `/${params.lang}/blogs/${params.slug}`,
            },
          }),
        }}
      />
    </div>
  );
}
