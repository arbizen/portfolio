import { notionManager } from '@/lib/NotionManager';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css';
import CodeBlock from '@/components/markdown/Code';
import Pre from '@/components/markdown/Pre';
import Image from '@/components/markdown/Image';
import Paragraph from '@/components/markdown/Paragraph';

export const dynamic = 'force-dynamic';

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const decodedSlug = decodeURIComponent(params.slug);
  const mdString = await notionManager.getBlogBySlug(decodedSlug);

  const customComponents = {
    code: CodeBlock,
    pre: Pre,
    img: Image,
    p: Paragraph,
  };

  return (
    <div className="p-16 flex justify-center">
      <Markdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={customComponents}
        className="prose"
      >
        {mdString}
      </Markdown>
    </div>
  );
}
