import { ApiKey, PrismaClient, User } from '@prisma/client'
import { MailerooClient } from 'maileroo'

const prisma = new PrismaClient()
const maileroo: MailerooClient = MailerooClient.getClient(process.env.MAILEROO_API_KEY)

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
  create: async (email: string): Promise<void> => {
    await prisma.user.create({ data: { email } })
  },
  getByEmail: async (email: string): Promise<User | null> => {
    const response = await prisma.user.findFirst({ where: { email } })
    return response
  },
}
