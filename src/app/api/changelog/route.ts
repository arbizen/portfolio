import { NextResponse } from 'next/server';
import { notionManager } from '@/lib/NotionManager';

export const dynamic = 'force-dynamic';

// Helper function to check if changelog should be shown based on expiry
const shouldShowChangelog = (changelog: any): boolean => {
  const expiryDays = changelog.expiresAfterDays ?? 30; // Default to 30 days if not specified

  const entryDate = new Date(changelog.date);
  const expiryDate = new Date(
    entryDate.getTime() + expiryDays * 24 * 60 * 60 * 1000,
  );
  const now = new Date();

  return now < expiryDate;
};

export async function GET() {
  try {
    // Fetch changelogs from Notion
    const data = await notionManager.getDatabaseByName('changelogs');

    if (!data || !data.results) {
      return NextResponse.json({ changelog: null });
    }

    // Find the most recent active changelog that hasn't expired
    const activeChangelogs = data.results
      .filter(
        (changelog: any) =>
          changelog.isActive && shouldShowChangelog(changelog),
      )
      .sort(
        (a: any, b: any) =>
          new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

    const latestChangelog = activeChangelogs[0] || null;

    return NextResponse.json({
      changelog: latestChangelog,
    });
  } catch (error) {
    console.error('Error fetching changelog:', error);
    return NextResponse.json(
      {
        changelog: null,
        error: 'Failed to fetch changelog',
      },
      { status: 500 },
    );
  }
}
