import { NextRequest, NextResponse } from 'next/server'
import { AnalysisService } from '@/services'
import { parseDate } from '@/utils'
import { DateFilters } from '@/types'

export const GET = async (req: NextRequest) => {
  try {
    const from: string | null = req.nextUrl.searchParams.get('from')
    const to: string | null = req.nextUrl.searchParams.get('to')
    const filters: DateFilters = { from: parseDate(from), to: parseDate(to) }
    const data = await AnalysisService.getAll(filters)
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('Error getting analysis', (error as Error).message)
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
