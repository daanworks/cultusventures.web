import { NextRequest, NextResponse } from 'next/server'
import { validateEmail } from '@/utils'
import { UserService, PaymentService } from '@/services'
import { User } from '@prisma/client'
import Stripe from 'stripe'

export const POST = async (req: NextRequest) => {
  const { email }: { email: string } = await req.json()
  if (!validateEmail(email)) return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  const user: User | null = await UserService.getByEmail(email)
  if (user?.subscribed) return NextResponse.json({ url: '/subscribed' }, { status: 303 })
  try {
    const session: Stripe.Checkout.Session = await PaymentService.createSession(email)
    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.log('Stripe session creation failed: ' + (error as Error).message)
    return NextResponse.json({ error: 'Stripe session creation failed: ' + (error as Error).message }, { status: 500 })
  }
}

export const GET = async (req: NextRequest) => {
  const searchParams: URLSearchParams = req.nextUrl.searchParams
  const sessionId: string | null = searchParams.get('session_id')
  if (!sessionId) return NextResponse.json({ error: 'Invalid session_id' }, { status: 400 })
  try {
    const session: Stripe.Checkout.Session = await PaymentService.getSession(sessionId)
    return NextResponse.json({ session }, { status: 200 })
  } catch (error) {
    console.error('Error retrieving session:', error)
    return NextResponse.json({ error: 'Failed to retrieve session' }, { status: 500 })
  }
}
