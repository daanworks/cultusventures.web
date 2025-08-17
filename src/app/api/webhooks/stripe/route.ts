import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'
import { UserService } from '@/services'
import mailchimp from '@mailchimp/mailchimp_marketing'
import { createHash } from '@/utils'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
})

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY!,
  server: process.env.MAILCHIMP_SERVER_PREFIX!,
})

export const POST = async (req: NextRequest) => {
  const payload: string = await req.text()
  const signature: string = (await headers()).get('stripe-signature')!
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (error) {
    console.error('Webhook verification failed:', (error as Error).message)
    return NextResponse.json({ error: 'Webhook verification failed: ' + (error as Error).message }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session: Stripe.Checkout.Session = event.data.object
    const email: string = session.metadata?.email || session.customer_email || session.customer_details?.email || ''
    if (!email) return NextResponse.json({ error: 'Email is missing from request' }, { status: 400 })
    const subscriberHash: string = createHash(email)
    try {
      await mailchimp.lists.setListMember(process.env.MAILCHIMP_LIST_ID!, subscriberHash, {
        email_address: email,
        status_if_new: 'subscribed',
        status: 'subscribed',
      })
      await UserService.upsert({ email, subscribed: true })
    } catch (error) {
      console.error('Mailchimp upsert error:', error as Error)
      return NextResponse.json({ error: 'Mailchimp upsert error' }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ received: true })
}
