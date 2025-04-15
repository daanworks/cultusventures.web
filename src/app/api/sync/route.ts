import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import { ANALYSIS_OPERATIONS } from '@/constants'
import { AnalysisService } from '@/services'
import { ANALYSIS_OPERATION } from '@/types'

export const GET = async (req: NextRequest) => {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

  try {
    const latestItem = await AnalysisService.getLatest()
    if (
      latestItem &&
      (latestItem.shortDescription === ANALYSIS_OPERATIONS.HOLD ||
        latestItem.shortDescription === ANALYSIS_OPERATIONS.DO_NOTHING)
    ) {
      await AnalysisService.deleteById(latestItem.id)
    }
    const today = new Date().toISOString().split('T')[0]
    const prompts = {
      [ANALYSIS_OPERATIONS.HOLD]:
        'Explain me why should I hold my Bitcoins in a few words according to todays fundamental and technical analysis. Today is ' +
        today,
      [ANALYSIS_OPERATIONS.BUY]: 'buy',
      [ANALYSIS_OPERATIONS.SELL]: 'sell',
      [ANALYSIS_OPERATIONS.DO_NOTHING]: 'do nothing with',
    }
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompts[ANALYSIS_OPERATIONS.HOLD],
    })
    const longDescription: string = response.text || ''
    const shortDescription: ANALYSIS_OPERATION = ANALYSIS_OPERATIONS.HOLD
    await AnalysisService.create(longDescription, shortDescription)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.log('Sync error: ' + (error as Error).message)
    return NextResponse.json({ error: 'Sync error: ' + (error as Error).message }, { status: 500 })
  }
}
