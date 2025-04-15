import { NextResponse } from 'next/server'
import { AnalysisService } from '@/services'
import { Analysis } from '@prisma/client'

export const GET = async () => {
  try {
    const response: Analysis | null = await AnalysisService.getLatest()
    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
