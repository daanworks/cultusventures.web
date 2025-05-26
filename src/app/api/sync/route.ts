import { NextRequest, NextResponse } from 'next/server'
import { MarketService, OpenAIService, SentimentService, TelegramService, TrendService } from '@/services'
import config from '@/config'
import { formatPrice } from '@/utils'
import { TrendType } from '@prisma/client'

export const maxDuration = 60

export const GET = async (req: NextRequest) => {
  const auth: string = req.headers.get('authorization') || ''
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const webSearch: string =
      (await OpenAIService.webSearch(config.webSearch.instructions, config.webSearch.input)) || ''
    const { score, explanation }: { score: number; explanation: string } =
      (await OpenAIService.analyze(config.analysisPrompt(webSearch))) || ''
    const btcPrice: number = (await MarketService.getBtcPrice()) || 0
    const trend: TrendType = (await TrendService.getLatest()) || 'BULLISH'
    await SentimentService.create(btcPrice, score, explanation, 0.0, trend)
    const message: string = `${score ? `Score: ${score}\n` : ''}${explanation ? `Explanation: ${explanation}\n` : ''}BTC Price: ${formatPrice(btcPrice)}`
    await TelegramService.sendMessage(message)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.log('Sync error: ' + (error as Error).message)
    return NextResponse.json({ error: 'Sync error: ' + (error as Error).message }, { status: 500 })
  }
}

export const runtime = 'nodejs'
