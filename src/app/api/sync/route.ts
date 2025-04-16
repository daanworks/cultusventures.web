import { NextRequest, NextResponse } from 'next/server'
import { HOLD, DO_NOTHING } from '@/constants'
import { AnalysisService, TelegramService } from '@/services'
import { Analysis, DecisionType } from '@prisma/client'

export const GET = async (req: NextRequest) => {
  const auth: string = req.headers.get('authorization') || ''
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const latestItem: Analysis | null = await AnalysisService.getLatest()
    if (latestItem && (latestItem.decision === HOLD || latestItem.decision === DO_NOTHING))
      await AnalysisService.deleteById(latestItem.id)
    const decision: DecisionType = HOLD
    await AnalysisService.create(decision)
    await TelegramService.sendMessage(decision)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.log('Sync error: ' + (error as Error).message)
    return NextResponse.json({ error: 'Sync error: ' + (error as Error).message }, { status: 500 })
  }
}
