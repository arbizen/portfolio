// @ts-nocheck
import { Client, isFullPage } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { getPlaiceholder } from 'plaiceholder';
import { unstable_cache } from 'next/cache';

/**
 * How long Notion data is reused, in seconds.
 *
 * Pages themselves are built ahead of time and served from the CDN (see
 * revalidate in app/[lang]/layout.tsx); this only spares Notion when several
 * pages rebuild at once. Kept short so it adds little to how long an edit in
 * Notion takes to appear. /api/revalidate clears both at once.
 */
export const NOTION_REVALIDATE = 60;

function cached<T>(key: string[], fn: () => Promise<T>): Promise<T> {
  return unstable_cache(fn, ['notion', ...key], { revalidate: NOTION_REVALIDATE, tags: ['notion'] })();
}

/**
 * A page's cover, as a link that keeps working.
 *
 * Notion's own uploads come back as signed links that expire after an hour,
 * and pages are now built ahead of time and kept for longer than that. So an
 * uploaded cover goes through /api/notion-file, which fetches a fresh link
 * whenever it's asked. Covers hosted elsewhere are used as they are.
 */
export function coverUrl(page: any): string {
  if (page?.cover?.external?.url) return page.cover.external.url;
  if (page?.cover?.file?.url) return `/api/notion-file/page/${page.id}`;
  return '';
}

/** Undo URL encoding however many times it was applied ("%2C" and "%252C" alike). */
function decodeSlug(slug: string): string {
  let out = slug;
  for (let i = 0; i < 3; i++) {
    try {
      const next = decodeURIComponent(out);
      if (next === out) break;
      out = next;
    } catch {
      break;
    }
  }
  return out;
}

export class NotionManager {
  constructor(
    private readonly notion: Client,
    private readonly databases: {
      name:
        | 'blogs'
        | 'activities'
        | 'bookmarks'
        | 'projects'
        | 'images'
        | 'poems'
        | 'changelogs';
      id: string;
    }[],
  ) {}
  async getNextCursorData(cursor: string, name: string) {
    return cached(['cursor', name, cursor], async () => {
      const db = await this.notion.databases.query({
        database_id: this.databases.find((db) => db.name === name)?.id!,
        start_cursor: cursor,
      });
      return this.getFormattedData(db, name);
    });
  }
  async getPageBySlug(slug: string) {
    try {
      const n2m = new NotionToMarkdown({ notionClient: this.notion });

      const id = slug.split('#')?.[1] || '';
      const blocks = await n2m.pageToMarkdown(id);
      const mdString = n2m.toMarkdownString(blocks);
      return mdString.parent;
    } catch (error) {
      console.error(
        'From the class: NotionManager, method: getPageBySlug',
        error,
      );
      return '';
    }
  }
  async getPageById(id: string) {
    return cached(['page', id], () => this.notion.pages.retrieve({ page_id: id }));
  }
  async getMdStringById(id: string) {
    return cached(['markdown', id], async () => {
      const n2m = new NotionToMarkdown({ notionClient: this.notion });
      // Uploaded images get a link that doesn't expire (see coverUrl).
      n2m.setCustomTransformer('image', async (block: any) => {
        const image = block.image;
        const caption = (image?.caption ?? []).map((t: any) => t.plain_text).join('');
        const src = image?.type === 'external' ? image.external.url : `/api/notion-file/block/${block.id}`;
        return `![${caption}](${src})`;
      });
      const blocks = await n2m.pageToMarkdown(id);
      const mdString = n2m.toMarkdownString(blocks);
      return mdString.parent;
    });
  }
  async getFormatted(name: string) {
    const res = await this.notion.search({
      query: name,
      filter: {
        property: 'object',
        value: 'page',
      },
    });
    return res.results
      .map((page: any) => {
        if (!isFullPage(page)) {
          throw new Error('Notion page is not a full page');
        }

        return {
          id: page.id,
          alt: page.properties?.name?.title[0]?.plain_text || '',
          src:
            coverUrl(page) ||
            '/blog-image.png',
          date: page.properties?.createdAt?.created_time || '',
          categories: page.properties.category
            ? page.properties.category.multi_select.map((tag) => tag.name)
            : [],
          description:
            page.properties?.description?.rich_text[0]?.plain_text || '',
        };
      })
      .filter((item) => item.alt === name)?.[0];
  }
  /** The page id behind a /blogs, /projects or /poems link, or null. */
  async findIdBySlug(name: 'blogs' | 'projects' | 'poems', slug: string) {
    const db = await this.getDatabaseByName(name);
    const want = decodeSlug(slug);
    const item = db?.results?.find((item: any) => decodeSlug(item.slug) === want);
    return (item?.id as string) ?? null;
  }
  async getDatabaseByName(name: string) {
    const id = this.databases.find((db) => db.name === name)?.id;
    if (!id) return null;
    return cached(['database', name], async () => {
      const db = await this.notion.databases.query({
        database_id: id!,
      });
      return this.getFormattedData(db, name);
    });
  }
  getFormattedData(db: any, name: string) {
    let formatted = null;
    if (name === 'activities') {
      formatted = db.results.map((page: any) => {
        if (!isFullPage(page)) {
          throw new Error('Notion page is not a full page');
        }

        return {
          id: page.id,
          type:
            'multi_select' in page.properties.type
              ? page.properties.type.multi_select.map((tag) => tag.name).join()
              : [],

          name: page.properties?.name?.title[0]?.plain_text || '',

          date: page.properties?.createdAt?.created_time || '',
          link: page.properties?.link?.rich_text[0]?.plain_text || '/',
        };
      });
    } else if (name === 'blogs') {
      formatted = db.results.map((page: any) => {
        if (!isFullPage(page)) {
          throw new Error('Notion page is not a full page');
        }

        const slug = page.properties?.title?.title[0]?.plain_text
          .trim()
          .toLowerCase()
          .replace(/-/g, ' ')
          .replace(/\s\s+/g, ' ')
          .replace(/ /g, '-');

        // url encode
        const encodedSlug = encodeURIComponent(slug);

        return {
          id: page.id,
          title: page.properties?.title?.title[0]?.plain_text || '',
          date: page.properties?.createdAt?.created_time || '',
          categories:
            'multi_select' in page.properties.category
              ? page.properties.category.multi_select.map((tag) => tag.name)
              : [],
          description:
            page.properties?.description?.rich_text[0]?.plain_text || '',
          image:
            coverUrl(page) ||
            '/blog-image.png',
          readTime: page.properties?.readTime?.number || 0,
          slug: encodedSlug,
          decodedSlug: slug,
          isPublished: page.properties?.isPublished?.checkbox || false,
        };
      });
    } else if (name === 'bookmarks') {
      formatted = db.results.map((page: any) => {
        if (!isFullPage(page)) {
          throw new Error('Notion page is not a full page');
        }

        return {
          id: page.id,
          type:
            'multi_select' in page.properties.type
              ? page.properties.type.multi_select.map((tag) => tag.name)
              : [],

          name: page.properties?.name?.title[0]?.plain_text || '',

          link: page.properties?.link?.rich_text[0]?.plain_text || '',
          description:
            page.properties?.description?.rich_text[0]?.plain_text || '',
        };
      });
    } else if (name === 'projects') {
      formatted = db.results.map((page: any) => {
        if (!isFullPage(page)) {
          throw new Error('Notion page is not a full page');
        }

        const slug = page.properties?.name?.title[0]?.plain_text
          .trim()
          .toLowerCase()
          .replace(/-/g, ' ')
          .replace(/\s\s+/g, ' ')
          .replace(/ /g, '-');

        // url encode
        const encodedSlug = encodeURIComponent(slug);

        return {
          id: page.id,
          date: page.properties?.createdAt?.created_time || '',
          type: page.properties?.type?.rich_text[0]?.plain_text || '',
          name: page.properties?.name?.title[0]?.plain_text || '',
          description:
            page.properties?.description?.rich_text[0]?.plain_text || '',
          year: page.properties?.year?.number || '',
          image:
            coverUrl(page) ||
            '/blog-image.png',
          stack:
            'multi_select' in page.properties.stack
              ? page.properties.stack.multi_select.map((tag) => tag.name)
              : [],
          githubLink:
            page.properties?.githubLink?.rich_text[0]?.plain_text || '',
          previewLink:
            page.properties?.previewLink?.rich_text[0]?.plain_text || '',
          isCompleted: page.properties?.isCompleted?.checkbox || false,
          slug: encodedSlug,
        };
      });
    } else if (name === 'poems') {
      formatted = db.results.map((page: any) => {
        if (!isFullPage(page)) {
          throw new Error('Notion page is not a full page');
        }

        const slug = page.properties?.title?.title[0]?.plain_text
          .trim()
          .toLowerCase()
          .replace(/-/g, ' ')
          .replace(/\s\s+/g, ' ')
          .replace(/ /g, '-');

        // url encode
        const encodedSlug = encodeURIComponent(slug);

        return {
          id: page.id,
          title: page.properties?.title?.title[0]?.plain_text || '',
          date: page.properties?.createdAt?.created_time || '',
          categories:
            'multi_select' in page.properties.category
              ? page.properties.category.multi_select.map((tag) => tag.name)
              : [],
          description:
            page.properties?.description?.rich_text[0]?.plain_text || '',
          image:
            coverUrl(page) ||
            '/blog-image.png',
          author: page.properties?.author?.rich_text[0]?.plain_text || '',
          slug: encodedSlug,
          decodedSlug: slug,
          isPublished: page.properties?.isPublished?.checkbox || false,
        };
      });
    } else if (name === 'changelogs') {
      formatted = db.results.map((page: any) => {
        if (!isFullPage(page)) {
          throw new Error('Notion page is not a full page');
        }

        return {
          id: page.id,
          message: page.properties?.title?.title[0]?.plain_text || '',
          link: page.properties?.link?.rich_text[0]?.plain_text || '',
          date:
            page.properties?.date?.date?.start ||
            page.properties?.createdAt?.created_time ||
            '',
          isActive: page.properties?.isActive?.checkbox || false,
          icon: page.properties?.icon?.rich_text[0]?.plain_text || 'sparkles',
          expiresAfterDays: page.properties?.expiresAfterDays?.number || null,
        };
      });
    } else if (name === 'images') {
      formatted = db.results.map((page: any) => {
        if (!isFullPage(page)) {
          throw new Error('Notion page is not a full page');
        }

        return {
          id: page.id,
          alt: page.properties?.name?.title[0]?.plain_text || '',
          src:
            coverUrl(page) ||
            '/blog-image.png',
          date: page.properties?.createdAt?.created_time || '',
          reactions: page.properties?.reactions?.number || 0,
          categories:
            'multi_select' in page.properties.category
              ? page.properties.category.multi_select.map((tag) => tag.name)
              : [],
        };
      });
    }
    return {
      results: formatted,
      has_more: db.has_more,
      next_cursor: db.next_cursor,
    };
  }
}

export const notionManager = new NotionManager(
  new Client({ auth: process.env.NOTION_TOKEN! }),
  [
    { name: 'blogs', id: process.env.NOTION_BLOG_DATABASE_ID! },
    { name: 'activities', id: process.env.NOTION_ACTIVITY_DATABASE_ID! },
    { name: 'bookmarks', id: process.env.NOTION_BOOKMARK_DATABASE_ID! },
    { name: 'projects', id: process.env.NOTION_PROJECT_DATABASE_ID! },
    { name: 'images', id: process.env.NOTION_IMAGE_DATABASE_ID! },
    { name: 'poems', id: process.env.NOTION_POEM_DATABASE_ID! },
    { name: 'changelogs', id: process.env.NOTION_CHANGELOG_DATABASE_ID! },
  ],
);
