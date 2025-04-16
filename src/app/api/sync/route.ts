import { NextRequest, NextResponse } from 'next/server'
import { HOLD, DO_NOTHING, BUY, SELL, DCA } from '@/constants'
import { AiService, AnalysisService, TelegramService } from '@/services'
import { Analysis, ShortDescription } from '@prisma/client'

export const GET = async (req: NextRequest) => {
  const auth: string = req.headers.get('authorization') || ''
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

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
    const longDescription: string = await AiService.generateContent(prompts[HOLD])
    const shortDescription: ShortDescription = HOLD
    await AnalysisService.create(longDescription, shortDescription)
    await TelegramService.sendMessage(shortDescription)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.log('Sync error: ' + (error as Error).message)
    return NextResponse.json({ error: 'Sync error: ' + (error as Error).message }, { status: 500 })
  }
}
