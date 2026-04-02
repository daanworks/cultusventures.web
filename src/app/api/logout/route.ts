import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { COOKIE_SESSION_NAME } from '@/constants'

export async function POST() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete(COOKIE_SESSION_NAME)
    return NextResponse.json({ message: 'Logout successful' })
  } catch (error) {
    console.error('Logout error:', (error as Error).message)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
