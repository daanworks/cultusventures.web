import { NextRequest, NextResponse } from 'next/server'
import { validateEmail } from '@/utils'
import { MailService, SubscriptionService, UserService } from '@/services'

export const PUT = async (req: NextRequest) => {
  try {
    const { email } = await req.json()
    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }
    await SubscriptionService.upsert(email)
    await UserService.upsert({ email, subscribed: true })
    await MailService.sendMail(email)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
