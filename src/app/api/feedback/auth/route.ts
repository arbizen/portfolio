import { NextResponse } from 'next/server';

// Admin verification logic
const isValidPassword = (password: string) => {
  // Check against the environment variable
  return password === process.env.ADMIN_SECRET_KEY;
};

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    // Validate password
    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    // Verify password
    if (!isValidPassword(password)) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    // Password is valid
    return NextResponse.json(
      { success: true, message: 'Authentication successful' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error during authentication:', error);
    return NextResponse.json(
      { error: 'An error occurred during authentication' },
      { status: 500 }
    );
  }
} 