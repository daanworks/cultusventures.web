import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { COOKIE_SESSION_NAME } from '@/constants'
import { verifySession } from '@/utils/session'

export const GET = async () => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(COOKIE_SESSION_NAME)?.value
    if (!token) return NextResponse.json({ user: null }, { status: 401 })
    const session = await verifySession(token)
    return NextResponse.json({
      user: {
        id: session.sub,
        email: session.email,
      },
    })
  } catch {
    return NextResponse.json({ user: null }, { status: 401 })
  }
}
