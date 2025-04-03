import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "../../../../../lib/prisma";
import { MailerooClient } from "maileroo";
import { randomBytes } from 'crypto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export const POST = async (req: NextRequest) => {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature")!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return NextResponse.json({ error: "Webhook verification failed: " + err.message }, { status: 400 } as any);
  }

  if (event.type === "payment_intent.succeeded") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_email ? session.customer_email : 'daniel.babinszky@gmail.com';

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
    } catch (e) {
      console.log("Database error: " + e.message)
      return NextResponse.json({ error: "Database error: " + e.message }, { status: 500 } as any)
    }

    const mailerooClient = MailerooClient.getClient(process.env.MAILEROO_API_KEY);
    await mailerooClient
      .setFrom('Cultus Ventures', 'cultusventures@05248f7e147e4168.maileroo.org')
      .setTo('Daniel Babinszky', 'daniel.babinszky@gmail.com')
      .setSubject('Hello World!')
      .setPlain(apiKey + ' ' + email)
      .sendBasicEmail();

    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ received: true });
}