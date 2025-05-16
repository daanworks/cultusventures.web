import { NextRequest, NextResponse } from 'next/server'
import { MarketService, SentimentService, TelegramService } from '@/services'
import { BitcoinPrice } from '@/types'
import { formatPrice } from '@/utils'
import { Sentiment } from '@prisma/client'

export const GET = async (req: NextRequest) => {
  const auth: string = req.headers.get('authorization') || ''
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const sentiment: Sentiment | null = await SentimentService.getLatest()
    const btcPriceData: BitcoinPrice | null = await MarketService.getBtcPrice()
    const btcPrice: number = btcPriceData?.bitcoin.usd || 0
    const socialScore = sentiment?.socialScore || 0
    const endOfCycleChance = sentiment?.endOfCycleChance || 0
    const message: string = socialScore + '\n' + endOfCycleChance + '\n' + 'BTC Price: ' + formatPrice(btcPrice)
    await TelegramService.sendMessage(message)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.log('Sync error: ' + (error as Error).message)
    return NextResponse.json({ error: 'Sync error: ' + (error as Error).message }, { status: 500 })
  }
}

export const runtime = 'nodejs'
