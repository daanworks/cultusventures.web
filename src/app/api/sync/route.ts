import { NextRequest, NextResponse } from 'next/server'
import { UserService, PaymentService, MailchimpService } from '@/services'
import { User } from '@prisma/client'
import Stripe from 'stripe'

export const maxDuration = 60

export const GET = async (req: NextRequest) => {
  const auth: string = req.headers.get('authorization') || ''
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const subscribers: User[] = await UserService.getAll({ subscribed: true })
    subscribers.forEach(async (subscriber: User) => {
      const email: string = subscriber.email
      const customer: Stripe.ApiList<Stripe.Customer> = await PaymentService.getCustomer(email)
      if (!customer.data.length) {
        await UserService.unsubscribe(email)
        await MailchimpService.unsubscribe(email)
        return
      }
      const customerId: string = customer.data[0].id
      const subscriptions: Stripe.ApiList<Stripe.Subscription> = await PaymentService.getSubscriptions(customerId)
      if (!subscriptions.data.length) {
        await UserService.unsubscribe(email)
        await MailchimpService.unsubscribe(email)
        return
      }
    })
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.log('Sync error: ' + (error as Error).message)
    return NextResponse.json({ error: 'Sync error: ' + (error as Error).message }, { status: 500 })
  }
}
