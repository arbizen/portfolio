import { Client } from '@notionhq/client';
import { NextResponse } from 'next/server';

// Always ask Notion: a cached answer would hand out an expired link.
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const notion = new Client({ auth: process.env.NOTION_TOKEN! });

/** Only the site's own databases: never other pages in the workspace. */
const SITE_DATABASES = new Set(
  [
    process.env.NOTION_BLOG_DATABASE_ID,
    process.env.NOTION_PROJECT_DATABASE_ID,
    process.env.NOTION_POEM_DATABASE_ID,
    process.env.NOTION_IMAGE_DATABASE_ID,
    process.env.NOTION_BOOKMARK_DATABASE_ID,
  ]
    .filter(Boolean)
    .map((id) => id!.replace(/-/g, '')),
);
const isSitePage = (page: any) => SITE_DATABASES.has((page?.parent?.database_id ?? '').replace(/-/g, ''));

/**
 * An image uploaded to Notion, by its page (cover) or block (inline image).
 *
 * Notion signs upload links for an hour, but pages are built ahead of time
 * and kept for longer. So pages link here instead, and this asks Notion for
 * a fresh link and redirects to it. The redirect is cached for half an hour,
 * well inside the hour the link is good for.
 */
export async function GET(_req: Request, { params }: { params: { kind: string; id: string } }) {
  try {
    let url: string | undefined;
    if (params.kind === 'page') {
      const page: any = await notion.pages.retrieve({ page_id: params.id });
      if (!isSitePage(page)) return new NextResponse('Not found', { status: 404 });
      url = page.cover?.file?.url ?? page.cover?.external?.url;
    } else if (params.kind === 'block') {
      const block: any = await notion.blocks.retrieve({ block_id: params.id });
      const page: any = block.parent?.page_id ? await notion.pages.retrieve({ page_id: block.parent.page_id }) : null;
      if (!isSitePage(page)) return new NextResponse('Not found', { status: 404 });
      url = block.image?.file?.url ?? block.image?.external?.url;
    }
    if (!url) return new NextResponse('Not found', { status: 404 });
    return NextResponse.redirect(url, {
      status: 302,
      headers: { 'Cache-Control': 'public, max-age=1800, s-maxage=1800' },
    });
  } catch {
    return new NextResponse('Not found', { status: 404 });
  }
}
