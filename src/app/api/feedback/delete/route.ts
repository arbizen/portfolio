import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

// Admin verification logic
const isValidPassword = (password: string) => {
  return password === process.env.ADMIN_SECRET_KEY;
};

export async function DELETE(request: Request) {
  try {
    const { id, password } = await request.json();

    // Validate input
    if (!id) {
      return NextResponse.json(
        { error: 'Missing feedback ID' },
        { status: 400 }
      );
    }

    // Verify password
    if (!password || !isValidPassword(password)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Initialize Notion client
    const notion = new Client({ auth: process.env.NOTION_TOKEN! });

    // Archive the page (Notion's way of "deleting")
    await notion.pages.update({
      page_id: id,
      archived: true,
    });

    return NextResponse.json(
      { success: true, message: 'Feedback deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting feedback:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
} 