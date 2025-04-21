import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { MailService, TelegramService } from '@/services'

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
    const email: string = session.metadata?.email || session.customer_email || ''

    if (!email) return NextResponse.json({ error: 'No email found' }, { status: 400 })

    const telegramInviteLink: string = await TelegramService.createInviteLink()

    await MailService.sendMail(email, telegramInviteLink)

    return NextResponse.json({ success: true })
  }
  return NextResponse.json({ received: true })
}
