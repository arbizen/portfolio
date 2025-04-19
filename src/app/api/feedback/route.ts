import { NextResponse } from 'next/server';
import { notionManager } from '@/lib/NotionManager';
import { Client } from '@notionhq/client';

// This will be our feedback database ID - you need to create this in Notion first
// Once created, add the ID to .env.local as NOTION_FEEDBACK_DATABASE_ID
const FEEDBACK_DATABASE_ID = process.env.NOTION_FEEDBACK_DATABASE_ID;

export async function POST(request: Request) {
  try {
    const { name, email, message, type } = await request.json();

    // Simple validation
    if (!name || !email || !message || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!FEEDBACK_DATABASE_ID) {
      console.error('NOTION_FEEDBACK_DATABASE_ID is not set');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Initialize a direct Notion client to avoid modifying NotionManager class
    const notion = new Client({ auth: process.env.NOTION_TOKEN! });

    // Create a page in the Feedback database
    await notion.pages.create({
      parent: {
        database_id: FEEDBACK_DATABASE_ID,
      },
      properties: {
        name: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        email: {
          rich_text: [
            {
              text: {
                content: email,
              },
            },
          ],
        },
        message: {
          rich_text: [
            {
              text: {
                content: message,
              },
            },
          ],
        },
        type: {
          select: {
            name: type === 'question' ? 'Question' : 'Feedback',
          },
        },
        createdAt: {
          date: {
            start: new Date().toISOString(),
          },
        },
        isResolved: {
          checkbox: false,
        },
      },
    });

    return NextResponse.json(
      { success: true, message: 'Feedback submitted successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing feedback submission:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your submission' },
      { status: 500 }
    );
  }
} 