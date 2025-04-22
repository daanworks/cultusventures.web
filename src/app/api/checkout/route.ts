import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'
import { UserService } from '@/services'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
})

export const POST = async (req: NextRequest) => {
  if (req.method !== 'POST') return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 })
  try {
    const { email } = await req.json()
    const user = await UserService.getByEmail(email)
    if (user) return NextResponse.json({ error: 'User already exists with this email' }, { status: 409 })
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Access to Cultus Ventures Daily BTC Analysis Telegram group',
            },
            unit_amount: 1000, // $10.00
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    })
    return NextResponse.json({ url: session.url }, { status: 200 })
  } catch (error) {
    NextResponse.json(
      { error: 'Something went wrong creating checkout session: ' + (error as Error).message },
      { status: 500 },
    )
  }
}
