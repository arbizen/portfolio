import { notionManager } from '@/lib/NotionManager';
import { NextResponse } from 'next/server';

export async function GET(req: Request, context: { params: { name: string } }) {
  try {
    if (!context?.params?.name)
      return NextResponse.json('No name provided', { status: 400 });
    const routes = context.params.name.split('+');
    let results: any = {};
    for (const route of routes) {
      const data = await notionManager.getDatabase(route);
      const filter = data?.filter((item: any) => item.name !== '');
      if (data) results[route] = filter || data;
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
