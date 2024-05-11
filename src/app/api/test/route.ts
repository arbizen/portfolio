import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST(req: Request) {
  const body = await req.json();
  const headerList = headers();
  const secret = headerList.get('Secret-key');
  if (secret !== '123456') {
    return NextResponse.json({ message: 'Unauthorized!' }, { status: 401 });
  }
  return NextResponse.json(body, { status: 201 });
}
