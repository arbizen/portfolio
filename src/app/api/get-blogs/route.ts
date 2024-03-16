import { notesApi } from '@/lib/api/blog';
import { NextResponse } from 'next/server';

export async function GET() {
  // const blogs = await notesApi.getNotes();
  // const blog = await notesApi.getNote(blogs[0].id);
  // return NextResponse.json(blog, {
  //   status: 200,
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  return NextResponse.json(
    { message: 'Hello World' },
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}
