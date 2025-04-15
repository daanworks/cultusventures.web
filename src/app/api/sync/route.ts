import { NextRequest, NextResponse } from 'next/server'
import { GenerateContentResponse, GoogleGenAI } from '@google/genai'
import { HOLD, DO_NOTHING, BUY, SELL, DCA } from '@/constants'
import { AnalysisService } from '@/services'
import { Analysis, ShortDescription } from '@prisma/client'

export const GET = async (req: NextRequest) => {
  const auth: string = req.headers.get('authorization') || ''
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

  try {
    const latestItem: Analysis | null = await AnalysisService.getLatest()
    if (latestItem && (latestItem.shortDescription === HOLD || latestItem.shortDescription === DO_NOTHING))
      await AnalysisService.deleteById(latestItem.id)
    const today = new Date().toISOString().split('T')[0]
    const prompts = {
      [HOLD]:
        'Explain me why should I hold my Bitcoins in a few words according to todays fundamental and technical analysis. Today is ' +
        today,
      [BUY]: 'buy',
      [SELL]: 'sell',
      [DO_NOTHING]: 'do nothing with',
      [DCA]: 'dca',
    }
    const generatedContent: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompts[HOLD],
    })
    const longDescription: string = generatedContent.text || ''
    const shortDescription: ShortDescription = HOLD
    await AnalysisService.create(longDescription, shortDescription)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.log('Sync error: ' + (error as Error).message)
    return NextResponse.json({ error: 'Sync error: ' + (error as Error).message }, { status: 500 })
  }
}
