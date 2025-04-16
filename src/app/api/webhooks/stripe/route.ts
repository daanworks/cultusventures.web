import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { randomBytes } from 'crypto'
import { ApiKeyService, MailService } from '@/services'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
})

export const POST = async (req: NextRequest) => {
  const payload: string = await req.text()
  const signature: string = req.headers.get('stripe-signature')!
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (error) {
    return NextResponse.json({ error: 'Webhook verification failed: ' + (error as Error).message }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session: Stripe.Checkout.Session = event.data.object
    const email: string = session.customer_details?.email || ''

    if (!email) return NextResponse.json({ error: 'No email found' }, { status: 400 })

    const apiKey: string = randomBytes(32).toString('hex').toUpperCase()

    try {
      await ApiKeyService.create(apiKey, email)
    } catch (error) {
      console.log('Database error: ' + (error as Error).message)
      return NextResponse.json({ error: 'Database error: ' + (error as Error).message }, { status: 500 })
    }

    await MailService.sendMail(email)

    return NextResponse.json({ success: true })
  }
  return NextResponse.json({ received: true })
}
