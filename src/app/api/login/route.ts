import { NextRequest, NextResponse } from 'next/server'
import { User } from '@prisma/client'
import { UserService } from '@/services'
import bcrypt from 'bcryptjs'
import { signSession } from '@/utils/session'
import { cookies } from 'next/headers'
import { COOKIE_SESSION_NAME } from '@/constants'

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json()
    if (!email || !password) return NextResponse.json({ error: 'Missing credentials' }, { status: 400 })
    const user: User | null = await UserService.getByEmail(email)
    if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    const isPasswordValid: boolean = await bcrypt.compare(password, user.passwordHash)
    if (!isPasswordValid) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    const token = await signSession({ sub: user.id, email: user.email })
    const cookieStore = await cookies()
    cookieStore.set(COOKIE_SESSION_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
    return NextResponse.json({ message: 'Login successful', user: { id: user.id, email: user.email } }, { status: 200 })
  } catch (error) {
    console.error('Login error:', (error as Error).message)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
