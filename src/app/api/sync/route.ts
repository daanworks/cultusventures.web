import { NextRequest, NextResponse } from 'next/server'
import { MarketService, OpenAIService, TelegramService } from '@/services'
import config from '@/config'
import { BitcoinPrice } from '@/types'
import { formatPrice } from '@/utils'

export const GET = async (req: NextRequest) => {
  const auth: string = req.headers.get('authorization') || ''
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const webSearch: string =
      (await OpenAIService.webSearch(config.webSearch.instructions, config.webSearch.input)) || ''
    const sentiment: string = (await OpenAIService.analyze(config.analysisPrompt(webSearch))) || ''
    const btcPriceData: BitcoinPrice | null = await MarketService.getBtcPrice()
    const btcPrice: number = btcPriceData?.bitcoin.usd || 0
    const message: string = `${sentiment}\nBTC Price: ${formatPrice(btcPrice)}`
    await TelegramService.sendMessage(message)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.log('Sync error: ' + (error as Error).message)
    return NextResponse.json({ error: 'Sync error: ' + (error as Error).message }, { status: 500 })
  }
}

export const runtime = 'nodejs'
