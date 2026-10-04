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
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';

// @ts-ignore
import dateformat from 'dateformat';
import PageAnimation from '@/components/page-animation';


// Each page is built on its first visit, then served from the cache and
// refreshed in the background (see revalidate in the [lang] layout).
export async function generateStaticParams() {
  return [];
}

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = await notionManager.findIdBySlug('projects', params.slug);

  if (!id) {
    return {
      title: 'Project',
      description: 'Description',
      openGraph: {
        title: 'Project',
        description: 'Description',
        images: [
          '/en/opengraph-image.png',
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Project',
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
    (pageInfo as any)?.properties?.name?.title[0]?.plain_text ||
    (pageInfo as any)?.properties?.title?.title[0]?.plain_text ||
    'Project';
  const description =
    (pageInfo as any)?.properties?.description?.rich_text[0]?.plain_text ||
    'Description';

  // The page itself is canonical (its id is part of the address).
  const canonical = `/en/projects/${encodeURIComponent(decodeURIComponent(params.slug))}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      url: canonical,
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
}: {
  params: { slug: string; lang: string };
}) {
  const id = await notionManager.findIdBySlug('projects', params.slug);

  if (!id) {
    return notFound();
  }
  const mdString = await notionManager.getMdStringById(id);

  const pageInfo = await notionManager.getPageById(id);
  const coverUrl =
    lastingCover(pageInfo) ||
    '/en/opengraph-image.png';
  const title =
    (pageInfo as any)?.properties?.name?.title[0]?.plain_text || 'Project name';
  const description =
    (pageInfo as any)?.properties?.description?.rich_text[0]?.plain_text ||
    'Description';
  const type =
    (pageInfo as any).properties?.type?.rich_text[0]?.plain_text || '';
  const date = (pageInfo as any)?.properties?.createdAt?.created_time || '';
  const githubLink = (pageInfo as any)?.properties?.githubLink?.rich_text[0]?.plain_text || '';
  const previewLink = (pageInfo as any)?.properties?.previewLink?.rich_text[0]?.plain_text || '';

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
            secondNav={{ name: 'Projects', url: `/${params.lang}/projects` }}
            current={title}
          />
        }
        header={<PageTitle title={title} />}
        description={description}
        footer={
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="flex gap-2">
              <Badge className="bg-orange-100 text-orange-500">
                {dateformat(date, 'ddS mmmm, yyyy')}
              </Badge>
              <Badge className="bg-red-100 text-red-500">{type}</Badge>
            </div>
            <div className="flex gap-2 sm:ml-auto">
              {githubLink && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={githubLink} target="_blank" className="flex items-center gap-2">
                    <Github size={16} />
                    GitHub
                  </Link>
                </Button>
              )}
              {previewLink && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={previewLink} target="_blank" className="flex items-center gap-2">
                    <ExternalLink size={16} />
                    Preview
                  </Link>
                </Button>
              )}
            </div>
          </div>
        }
      />
      <div className="flex flex-col relative z-50">
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
