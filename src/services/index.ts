import { Analysis, ApiKey, PrismaClient, User } from '@prisma/client'
import { MailerooClient } from 'maileroo'
import mailchimp from '@mailchimp/mailchimp_marketing'
import { createHash } from '@/utils'
import Stripe from 'stripe'
import { DateFilters } from '@/types'

const prisma = new PrismaClient()
const maileroo: MailerooClient = MailerooClient.getClient(process.env.MAILEROO_API_KEY)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
})

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY!,
  server: process.env.MAILCHIMP_SERVER_PREFIX!,
})

export const ApiKeyService = {
  getAll: async (): Promise<ApiKey[] | null> => {
    const response = await prisma.apiKey.findMany()
    return response
  },
  create: async (apiKey: string, userId: string): Promise<void> => {
    await prisma.apiKey.create({ data: { userId, apiKey } })
  },
}

export const MailService = {
  sendMail: async (to: string): Promise<void> => {
    const html = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;background:#FCFCFC;border:1px solid #D3D3D3;border-radius:8px;"><div style="margin-bottom:20px;"><img src="https://www.cultusventures.com/logo.png" alt="Cultus Ventures Logo" style="height:60px;margin-bottom:30px;" /><h2 style="color:#000011;margin:0;">Welcome to the Cultus Ventures Newsletter!</h2></div><p style="font-size:16px;color:#4F4F4F;">You’re officially on the list. From now on, you’ll receive:</p><ul style="font-size:16px;color:#4F4F4F;line-height:1.6;"><li>Insights on Bitcoin investing</li><li>Exclusive updates on our latest positions</li><li>Educational content to empower your financial journey</li></ul><p style="font-size:16px;color:#4F4F4F;">We’re excited to have you with us. <a href="https://x.com/cultusventures" style="color:#003096;text-decoration:underline;">Follow us on X</a> to stay even more connected.</p><hr style="margin:20px 0;border-color:#D3D3D3;"><p style="font-size:12px;color:#878787;">If you didn’t subscribe to this newsletter, feel free to ignore this email or contact us at <a href="mailto:info@cultusventures.com" style="color:#003096;text-decoration:underline;">info@cultusventures.com</a>.</p></div>`
    await maileroo
      .setFrom('Cultus Ventures', 'no-reply@cultusventures.com')
      .setTo('Cultus Ventures API User', to)
      .setSubject('Thanks for subscribing!')
      .setHtml(html)
      .sendBasicEmail()
  },
}

export const UserService = {
  create: async (data: { email: string; subscribed: boolean }): Promise<User> => {
    return await prisma.user.create({ data })
  },
  getByEmail: async (email: string): Promise<User | null> => {
    return await prisma.user.findFirst({ where: { email } })
  },
  upsert: async (data: { email: string; subscribed: boolean }): Promise<User> => {
    const { email } = data
    return await prisma.user.upsert({
      where: { email },
      update: data,
      create: data,
    })
  },
  getAll: async (where: { subscribed: boolean }): Promise<User[]> => {
    return await prisma.user.findMany({ where })
  },
  unsubscribe: async (email: string): Promise<User> => {
    return await prisma.user.update({ where: { email }, data: { subscribed: false } })
  },
}

export const AnalysisService = {
  getAll: async (filters: { from: Date | null; to: Date | null }): Promise<Analysis[]> => {
    const { from, to }: DateFilters = filters
    return await prisma.analysis.findMany({
      where: { createdAt: { ...(from && { gte: from }), ...(to && { lte: to }) } },
    })
  },
  getById: async (id: string): Promise<Analysis | null> => {
    return await prisma.analysis.findUnique({ where: { id } })
  },
}

export const MailchimpService = {
  unsubscribe: async (email: string): Promise<void> => {
    const subscriberHash: string = createHash(email)
    try {
      await mailchimp.lists.updateListMember(process.env.MAILCHIMP_LIST_ID!, subscriberHash, { status: 'unsubscribed' })
    } catch (error) {
      console.error(`Mailchimp unsubscribe error for ${email}:`, (error as Error).message)
    }
  },
  setListMember: async (email: string): Promise<void> => {
    const subscriberHash: string = createHash(email)
    try {
      await mailchimp.lists.setListMember(process.env.MAILCHIMP_LIST_ID!, subscriberHash, {
        email_address: email,
        status_if_new: 'subscribed',
        status: 'subscribed',
      })
    } catch (error) {
      console.error('Mailchimp upsert error:', error as Error)
    }
  },
}

export const PaymentService = {
  getCustomer: async (email: string): Promise<Stripe.ApiList<Stripe.Customer>> =>
    await stripe.customers.list({ email, limit: 1 }),
  getSubscriptions: async (customerId: string): Promise<Stripe.ApiList<Stripe.Subscription>> =>
    await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
      limit: 1,
    }),
  constructEvent: (payload: string, signature: string): Stripe.Event => {
    return stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  },
  createSession: async (email: string): Promise<Stripe.Checkout.Session> =>
    await stripe.checkout.sessions.create({
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
    }),
  getSession: async (sessionId: string): Promise<Stripe.Checkout.Session> =>
    await stripe.checkout.sessions.retrieve(sessionId),
}
