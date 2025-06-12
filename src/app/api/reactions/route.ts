import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const IMAGES_DATABASE_ID = process.env.NOTION_IMAGE_DATABASE_ID;

export async function POST(request: Request) {
  try {
    const { imageId, reactions } = await request.json();

    // Simple validation
    if (!imageId || reactions === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: imageId and reactions' },
        { status: 400 },
      );
    }

    if (!IMAGES_DATABASE_ID) {
      console.error('NOTION_IMAGE_DATABASE_ID is not set');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 },
      );
    }

    // Initialize Notion client
    const notion = new Client({ auth: process.env.NOTION_TOKEN! });

    // Update the specific image page with new reaction count
    await notion.pages.update({
      page_id: imageId,
      properties: {
        reactions: {
          number: parseInt(reactions, 10),
        },
      },
    });

    return NextResponse.json(
      { success: true, message: 'Reaction updated successfully', reactions },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error updating reaction:', error);
    return NextResponse.json(
      { error: 'An error occurred while updating the reaction' },
      { status: 500 },
    );
  }
} 