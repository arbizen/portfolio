import { notionManager } from '@/lib/NotionManager';
import { NextResponse } from 'next/server';
import { compareAsc, compareDesc } from 'date-fns';
import { getPlaiceholder } from 'plaiceholder';

const CompareFunctionLookup = {
  asc: compareAsc,
  desc: compareDesc,
};

export async function GET(req: Request, context: { params: { name: string } }) {
  try {
    const url = new URL(req.url);
    const start = url.searchParams.get('start') ?? 0;
    let count = url.searchParams.get('count') ?? 25; // default count is 25
    const order = url.searchParams.get('order') ?? 'desc';
    let results: any = {};
    const data = await notionManager.getDatabaseByName('images');
    const transformedData = [];

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
    if (filter.length < 25 || Number(count) > 100) count = filter.length;
    const limited = filter.slice(+start, Number(start) + Number(count));
    for (const item of limited) {
      const src = item.src;
      const buffer = await fetch(src).then(async (res) =>
        Buffer.from(await res.arrayBuffer()),
      );
      const { base64 } = await getPlaiceholder(buffer);
      transformedData.push({
        ...item,
        blurDataURL: base64,
      });
    }
    const pageEnd =
      Number(start) + Number(count) >= 100 ? 0 : Number(start) + Number(count);
    if (data) {
      results['images'] = {
        data: transformedData,
        next_cursor: data.next_cursor,
        has_more: data.has_more,
        totalLength: limited.length,
        start: pageEnd === 100 ? 0 : start,
        end: pageEnd,
      };
    }
    if (!results || Object.keys(results).length === 0)
      return NextResponse.json('Database not found', { status: 404 });
    return NextResponse.json(results, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
