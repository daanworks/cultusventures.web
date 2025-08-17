import { NextRequest, NextResponse } from 'next/server'
import { validateEmail } from '@/utils'
import { UserService } from '@/services'
import { User } from '@prisma/client'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
})

export const POST = async (req: NextRequest) => {
  const { email }: { email: string } = await req.json()
  if (!validateEmail(email)) return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  let user: User | null
  user = await UserService.getByEmail(email)
  if (user?.subscribed) return NextResponse.json({ url: '/subscribed' }, { status: 303 })
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      customer_email: email,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/oops`,
      metadata: {
        email,
      },
    })
    return NextResponse.json({ url: session.url })
  } catch (e) {
    console.log('Stripe session creation failed: ' + (e as Error).message)
    return NextResponse.json({ error: 'Stripe session creation failed: ' + (e as Error).message }, { status: 500 })
  }
}

export const GET = async (req: NextRequest) => {
  const searchParams: URLSearchParams = req.nextUrl.searchParams
  const sessionId: string | null = searchParams.get('session_id')
  if (!sessionId) return NextResponse.json({ error: 'Invalid session_id' }, { status: 400 })
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return NextResponse.json({ session }, { status: 200 })
  } catch (error) {
    console.error('Error retrieving session:', error)
    return NextResponse.json({ error: 'Failed to retrieve session' }, { status: 500 })
  }
}
