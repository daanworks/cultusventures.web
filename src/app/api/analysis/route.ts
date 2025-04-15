import { NextResponse } from 'next/server'
import { AnalysisService } from '@/services'

export const GET = async () => {
  try {
    const response = await AnalysisService.getLatest()
    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
