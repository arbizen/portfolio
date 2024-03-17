import { NextResponse } from 'next/server';
import { createApi } from 'unsplash-js';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get('query') ?? 'flower';
    const unsplash = createApi({
      accessKey: process.env.UNSPLASH_ACCESS_KEY!,
    });
    const res = await unsplash.search.getPhotos({
      query,
      page: 1,
      perPage: 3,
    });
    const results = res.response?.results;
    return NextResponse.json(
      { results },
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
