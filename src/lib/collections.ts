import { notionManager } from '@/lib/NotionManager';
import { compareAsc, compareDesc } from 'date-fns';

const CompareFunctionLookup = {
  asc: compareAsc,
  desc: compareDesc,
};

export type CollectionQuery = {
  page?: number | string;
  limit?: number | string;
  category?: string;
  order?: string;
};

/**
 * One or more collections ("blogs", or "blogs+projects"), sorted and sliced.
 *
 * The pages call this directly. They used to fetch it over HTTP from the
 * site's own /api/data, a second trip to the server for every page, which
 * also made pages impossible to build ahead of time.
 */
export async function getCollections(name: string, query: CollectionQuery = {}) {
  const order = query.order ?? 'desc';
  const page = query.page ?? 1;
  let limit: any = query.limit ?? 25; // default count is 25
  const startIndex = (+page - 1) * +limit;
  const endIndex = startIndex + +limit;
  const category = query.category ?? '';
  const routes = name.split('+');
  let results: any = {};
  for (const route of routes) {
    const data = await notionManager.getDatabaseByName(route);

    // sort order
    const sortOrder = order === 'asc' ? 'asc' : 'desc';

    const filter = [
      ...data?.results
        ?.filter((item: any) => item.name !== '' || item.title !== '')
        .sort((a: any, b: any) => {
          return CompareFunctionLookup[sortOrder](
            new Date(a.date),
            new Date(b.date),
          );
        }),
    ];
    if (filter.length < 25 || Number(limit) > 100) limit = filter.length;
    //const limited = filter.slice(+start, Number(start) + Number(count));
    const limited = filter.slice(startIndex, endIndex);
    const categoryFiltered = filter.filter((item: any) => {
      if (category === '') return true;
      if (item.categories) {
        return item.categories.includes(category); // filter by category - blogs
      } else if (item.stack) {
        if (item.stack) {
          return item.stack.includes(category); // filter by category - projects
        }
      } else {
        if (item.type) {
          return item.type.includes(category); // filter by category - bookmarks
        }
      }
    });
    if (data) {
      results[route] = {
        data:
          category === 'All'
            ? limited
            : category
            ? categoryFiltered
            : limited,
        next_cursor: data.next_cursor,
        has_more: data.has_more,
        totalLength: limited.length,
      };
    }
  }
  return results;
}
