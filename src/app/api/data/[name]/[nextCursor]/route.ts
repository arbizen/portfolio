import { notionManager } from '@/lib/NotionManager';
import { NextResponse } from 'next/server';
import { compareAsc, compareDesc } from 'date-fns';

const CompareFunctionLookup = {
  asc: compareAsc,
  desc: compareDesc,
};

export async function GET(
  req: Request,
  context: { params: { nextCursor: string; name: string } },
) {
  try {
    const url = new URL(req.url);
    const category = url.searchParams.get('category') || '';

    const page = url.searchParams.get('page') ?? 1;
    let limit = url.searchParams.get('limit') ?? 1;
    const startIndex = (+page - 1) * +limit;
    const endIndex = startIndex + +limit;

    if (!context?.params?.name)
      return NextResponse.json('No name provided', { status: 400 });
    const routes = context.params.name.split('+');
    let results: any = {};
    for (const route of routes) {
      const data = await notionManager.getNextCursorData(
        context.params.nextCursor,
        route,
      );

      // sort order
      const sortOrder = 'desc';

      const filter = [
        ...data?.results
          ?.filter((item: any) => item.name !== '')
          .sort((a: any, b: any) => {
            return CompareFunctionLookup[sortOrder](
              new Date(a.date),
              new Date(b.date),
            );
          }),
      ];
      if (filter.length < 25) limit = filter.length;
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
      if (data)
        results[route] =
          {
            data:
              category === 'All'
                ? limited
                : category
                ? categoryFiltered
                : limited,
            next_cursor: data.next_cursor,
            has_more: data.has_more,
            totalLength: limited.length,
          } || data;
    }
    if (!results || Object.keys(results).length === 0)
      return NextResponse.json('Database not found', { status: 404 });
    return NextResponse.json(
      { ...results },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
