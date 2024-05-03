// @ts-nocheck
import { Client, isFullPage } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { getPlaiceholder } from 'plaiceholder';
export class NotionManager {
  constructor(
    private readonly notion: Client,
    private readonly databases: {
      name: 'blogs' | 'activities' | 'bookmarks' | 'projects' | 'images';
      id: string;
    }[],
  ) {}
  async getNextCursorData(cursor: string, name: string) {
    const db = await this.notion.databases.query({
      database_id: this.databases.find((db) => db.name === name)?.id!,
      start_cursor: cursor,
    });
    return this.getFormattedData(db, name);
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
    const page = await this.notion.pages.retrieve({ page_id: id });
    return page;
  }
  async getMdStringById(id: string) {
    const n2m = new NotionToMarkdown({ notionClient: this.notion });
    const blocks = await n2m.pageToMarkdown(id);
    const mdString = n2m.toMarkdownString(blocks);
    return mdString.parent;
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
            page.cover?.external?.url ||
            page.cover?.file?.url ||
            'https://source.unsplash.com/a-person-standing-on-top-of-a-mountain-nMzbnMzMjYU',
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
  async getDatabaseByName(name: string) {
    const id = this.databases.find((db) => db.name === name)?.id;
    if (!id) return null;
    const db = await this.notion.databases.query({
      database_id: id!,
    });
    return this.getFormattedData(db, name);
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

        const slug =
          page.properties?.title?.title[0]?.plain_text
            .toLowerCase()
            .replace(/-/g, ' ')
            .replace(/\s\s+/g, ' ')
            .replace(/ /g, '-') +
            '#' +
            page.id || '';

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
            page.cover?.external?.url ||
            page.cover?.file?.url ||
            'https://source.unsplash.com/a-person-standing-on-top-of-a-mountain-nMzbnMzMjYU',
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

        const slug =
          page.properties?.name?.title[0]?.plain_text
            .toLowerCase()
            .replace(/-/g, ' ')
            .replace(/\s\s+/g, ' ')
            .replace(/ /g, '-') +
            '#' +
            page.id || '';

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
            page.cover?.external?.url ||
            page.cover?.file?.url ||
            'https://source.unsplash.com/a-person-standing-on-top-of-a-mountain-nMzbnMzMjYU',
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
    } else if (name === 'images') {
      formatted = db.results.map((page: any) => {
        if (!isFullPage(page)) {
          throw new Error('Notion page is not a full page');
        }

        return {
          id: page.id,
          alt: page.properties?.name?.title[0]?.plain_text || '',
          src:
            page.cover?.external?.url ||
            page.cover?.file?.url ||
            'https://source.unsplash.com/a-person-standing-on-top-of-a-mountain-nMzbnMzMjYU',
          date: page.properties?.createdAt?.created_time || '',
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
  ],
);
