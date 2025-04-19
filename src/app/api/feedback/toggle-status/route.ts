import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

// Admin verification logic
const isValidPassword = (password: string) => {
  return password === process.env.ADMIN_SECRET_KEY;
};

export async function POST(request: Request) {
  try {
    const { id, isResolved, password } = await request.json();

    // Validate input
    if (!id || isResolved === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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

    // Update the resolved status
    await notion.pages.update({
      page_id: id,
      properties: {
        isResolved: {
          checkbox: isResolved,
        },
      },
    });

    return NextResponse.json(
      { success: true, message: 'Status updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating feedback status:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
} 