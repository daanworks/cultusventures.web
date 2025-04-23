import { Analysis, ApiKey, Decision, DecisionType, PrismaClient, User } from '@prisma/client'
import { GenerateContentResponse, GoogleGenAI } from '@google/genai'
import { MailerooClient } from 'maileroo'
import { BitcoinPrice, TelegramInviteLink } from '@/types'

const prisma = new PrismaClient()
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
const maileroo: MailerooClient = MailerooClient.getClient(process.env.MAILEROO_API_KEY)

export const AnalysisService = {
  getLatest: async (): Promise<Analysis | null> => {
    const response = await prisma.analysis.findFirst({
      orderBy: { createdAt: 'desc' },
    })
    return response
  },
  deleteById: async (id: string): Promise<void> => {
    await prisma.analysis.delete({
      where: {
        id,
      },
    })
  },
  create: async (decision: DecisionType, btcPrice: number): Promise<void> => {
    await prisma.analysis.create({
      data: {
        decision,
        btcPrice,
      },
    })
  },
}

export const ApiKeyService = {
  getAll: async (): Promise<ApiKey[] | null> => {
    const response = await prisma.apiKey.findMany()
    return response
  },
  create: async (apiKey: string, userId: string): Promise<void> => {
    await prisma.apiKey.create({ data: { userId, apiKey } })
  },
}

export const TelegramService = {
  sendMessage: async (text: string): Promise<void> => {
    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text,
        parse_mode: 'Markdown',
      }),
    })
  },
  createInviteLink: async (): Promise<string> => {
    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/createChatInviteLink`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        member_limit: 1,
      }),
    })
    const data: TelegramInviteLink = await response.json()
    return data.result.invite_link || ''
  },
}

export const AiService = {
  generateContent: async (prompt: string): Promise<string> => {
    const generatedContent: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    })
    return generatedContent.text || ''
  },
}

export const MailService = {
  sendMail: async (to: string, telegramInviteLink: string): Promise<void> => {
    const html = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;background:#FCFCFC;border:1px solid #D3D3D3;border-radius:8px;"><div style="margin-bottom:20px;"><img src="https://www.cultusventures.com/logo.png" alt="Cultus Ventures Logo" style="height:40px;margin-bottom:10px;" /><h2 style="color:#000011;margin:0;">You made it – welcome aboard!</h2></div><p style="font-size:16px;color:#4F4F4F;">Here is your Telegram invite link:</p><pre style="background:#E8E8E8;padding:10px;border-radius:5px;font-size:18px;font-weight:bold;color:#003096;">${telegramInviteLink}</pre><p style="font-size:14px;color:#6B6B6B;">Please note: this link is single-use only and cannot be reused once accessed.</p><hr style="margin:20px 0;border-color:#D3D3D3;"><p style="font-size:12px;color:#878787;">If you didn’t expect this email, feel free to ignore it or contact support at <a href="mailto:cultusventures@gmail.com" style="color:#003096;text-decoration:underline;">cultusventures@gmail.com</a>.</p></div>`
    await maileroo
      .setFrom('Cultus Ventures', 'no-reply@cultusventures.com')
      .setTo('Cultus Ventures API User', to)
      .setSubject("Thanks for purchasing, here's your Telegram invite link")
      .setHtml(html)
      .sendBasicEmail()
  },
}

export const DecisionService = {
  getLatest: async (): Promise<Decision | null> => {
    const response = await prisma.decision.findFirst({
      orderBy: { createdAt: 'desc' },
    })
    return response
  },
}

export const MarketService = {
  getBtcPrice: async (): Promise<BitcoinPrice | null> => {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
    return await response.json()
  },
}

export const UserService = {
  create: async (email: string): Promise<void> => {
    await prisma.user.create({ data: { email } })
  },
  getByEmail: async (email: string): Promise<User | null> => {
    const user = await prisma.user.findFirst({ where: { email } })
    return user
  },
}
