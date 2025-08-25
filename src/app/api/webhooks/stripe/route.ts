import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'
import { MailchimpService, PaymentService, UserService } from '@/services'

export const POST = async (req: NextRequest) => {
  const payload: string = await req.text()
  const signature: string = (await headers()).get('stripe-signature')!

  const event: Stripe.Event = PaymentService.constructEvent(payload, signature)
  if (event.type === 'checkout.session.completed') {
    const session: Stripe.Checkout.Session = event.data.object
    const email: string = session.metadata?.email || session.customer_email || session.customer_details?.email || ''
    if (!email) return NextResponse.json({ error: 'Email is missing from request' }, { status: 400 })
    await MailchimpService.setListMember(email)
    await UserService.upsert({ email, subscribed: true })
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ received: true })
}
