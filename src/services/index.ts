import { PrismaClient, Analysis, ApiKey, ShortDescription } from '@prisma/client'
import { GenerateContentResponse, GoogleGenAI } from '@google/genai'

const prisma = new PrismaClient()
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

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
  create: async (longDescription: string, shortDescription: ShortDescription): Promise<void> => {
    await prisma.analysis.create({
      data: {
        longDescription,
        shortDescription,
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
