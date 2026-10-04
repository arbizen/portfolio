import { NextResponse } from 'next/server';
import { getCollections } from '@/lib/collections';

export async function GET(req: Request, context: { params: { name: string } }) {
  try {
    const url = new URL(req.url);
    if (!context?.params?.name)
      return NextResponse.json('No name provided', { status: 400 });
    const results = await getCollections(context.params.name, {
      order: url.searchParams.get('order') ?? 'desc',
      page: url.searchParams.get('page') ?? 1,
      limit: url.searchParams.get('limit') ?? 25,
      category: url.searchParams.get('category') ?? '',
    });
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
