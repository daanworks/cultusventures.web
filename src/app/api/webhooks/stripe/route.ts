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
    const email = session.customer_details?.email

    if (!email) {
      return NextResponse.json({ error: "No email found" }, { status: 400 } as any);
    }

    const apiKey = randomBytes(32).toString('hex').toUpperCase();

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
    const html = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;background:#f9f9f9;border:1px solid #ddd;border-radius:8px;"><h2 style="color:#333;">🎉 Thank you for subscribing!</h2><p style="font-size:16px;color:#555;">Here is your personal API key:</p><pre style="background:#eee;padding:10px;border-radius:5px;font-size:18px;font-weight:bold;color:#000;">{{API_KEY}}</pre><p style="font-size:14px;color:#777;">Please keep this key safe. You’ll need it to access our API services.</p><hr style="margin:20px 0;"><p style="font-size:12px;color:#aaa;">If you didn’t expect this email, feel free to ignore it or contact support.</p></div>`
    await mailerooClient
      .setFrom('Cultus Ventures', 'no-reply@cultusventures.com')
      .setTo('Cultus Ventures API User', email)
      .setSubject('Thanks for purchasing, here\'s your API key')
      .setHtml(html)
      .sendBasicEmail();

    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ received: true });
}