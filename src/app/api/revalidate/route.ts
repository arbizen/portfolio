import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Show Notion edits now instead of within a few minutes:
 * open /api/revalidate?secret=REVALIDATE_SECRET after editing.
 *
 * Clears the cached Notion data and every page built from it; the next visit
 * to each page builds it fresh.
 */
export async function GET(req: Request) {
  const secret = new URL(req.url).searchParams.get('secret');
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  revalidateTag('notion');
  revalidatePath('/', 'layout');
  return NextResponse.json({ ok: true, refreshed: new Date().toISOString() });
}
