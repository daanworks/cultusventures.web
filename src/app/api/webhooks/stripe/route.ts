import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "../../../../../lib/prisma";
import { MailerooClient } from "maileroo";
import { randomBytes } from 'crypto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

export const POST = async (req: NextRequest) => {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature")!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (error) {
    return NextResponse.json({ error: "Webhook verification failed: " + (error as Error).message }, { status: 400 } as any);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as unknown as Stripe.Checkout.Session;
    const email = session.customer_email

    if (!email) {
      return NextResponse.json({ error: "No email found" }, { status: 400 } as any);
    }

    const apiKey = randomBytes(32).toString('hex');

    try {
      await prisma.apiKey.create({
        data: {
          email,
          apiKey
        }
      })
    } catch (error) {
      console.log("Database error: " + (error as Error).message)
      return NextResponse.json({ error: "Database error: " + (error as Error).message }, { status: 500 } as any)
    }

    const mailerooClient = MailerooClient.getClient(process.env.MAILEROO_API_KEY);
    await mailerooClient
      .setFrom('Cultus Ventures', 'cultusventures@05248f7e147e4168.maileroo.org')
      .setTo('Cultus Ventures API User', email)
      .setSubject('Hello World from successful stripe payment!')
      .setPlain(apiKey + ' ' + email)
      .sendBasicEmail();

    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ received: true });
}