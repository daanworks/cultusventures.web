import { PrismaClient, Analysis, ApiKey, DecisionType, Decision } from '@prisma/client'
import { GenerateContentResponse, GoogleGenAI } from '@google/genai'
import { MailerooClient } from 'maileroo'
import { Price } from '@/types'

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
  create: async (decision: DecisionType, btcPrice: string): Promise<void> => {
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
  create: async (apiKey: string, email: string): Promise<void> => {
    await prisma.apiKey.create({ data: { email, apiKey } })
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
  sendMail: async (to: string): Promise<void> => {
    const html: string = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;background:#f9f9f9;border:1px solid #ddd;border-radius:8px;"><h2 style="color:#333;">🎉 Thank you for subscribing!</h2><p style="font-size:16px;color:#555;">Here is your personal API key:</p><pre style="background:#eee;padding:10px;border-radius:5px;font-size:18px;font-weight:bold;color:#000;">{{API_KEY}}</pre><p style="font-size:14px;color:#777;">Please keep this key safe. You’ll need it to access our API services.</p><hr style="margin:20px 0;"><p style="font-size:12px;color:#aaa;">If you didn’t expect this email, feel free to ignore it or contact support.</p></div>`
    await maileroo
      .setFrom('Cultus Ventures', 'no-reply@cultusventures.com')
      .setTo('Cultus Ventures API User', to)
      .setSubject("Thanks for purchasing, here's your API key")
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
  getBtcPrice: async (): Promise<Price | null> => {
    const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT')
    return await response.json()
  },
}
