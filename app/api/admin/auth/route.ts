import { NextRequest, NextResponse } from 'next/server'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
const ADMIN_TOKEN_SECRET = process.env.ADMIN_TOKEN_SECRET || 'super-secret-admin-token'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    // Generate a token that's valid for this session
    const token = Buffer.from(`${ADMIN_TOKEN_SECRET}:${Date.now()}`).toString('base64')

    return NextResponse.json(
      {
        token,
        message: 'Authentication successful',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}
