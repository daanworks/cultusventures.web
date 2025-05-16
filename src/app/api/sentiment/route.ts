import { NextResponse } from 'next/server'
import { SentimentService } from '@/services'
import { Sentiment } from '@prisma/client'

export const GET = async () => {
  try {
    const response: Sentiment | null = await SentimentService.getLatest()
    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
