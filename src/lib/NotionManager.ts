import { Client, isFullPage } from '@notionhq/client';
class NotionManager {
  constructor(
    private readonly notion: Client,
    private readonly databases: {
      name: 'blogs' | 'activities' | 'bookmarks';
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
          // @ts-ignore
          name: page.properties?.name?.title[0]?.plain_text || '',
          // @ts-ignore
          date: page.properties?.date?.date?.start || '',
        };
      });
    } else if (name === 'blogs') {
      formatted = db.results.map((page: any) => {
        if (!isFullPage(page)) {
          throw new Error('Notion page is not a full page');
        }

        return {
          id: page.id,
          // @ts-ignore
          name: page.properties?.name?.title[0]?.plain_text || '',
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
              ? page.properties.type.multi_select.map((tag) => tag.name).join()
              : [],
          // @ts-ignore
          name: page.properties?.name?.title[0]?.plain_text || '',
          // @ts-ignore
          link: page.properties?.link?.rich_text[0]?.plain_text || '',
          description:
            // @ts-ignore
            page.properties?.description?.rich_text[0]?.plain_text || '',
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
  ],
);
