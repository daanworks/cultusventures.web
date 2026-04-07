import { NextRequest, NextResponse } from 'next/server'
import { Currency } from '@/types'

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url)
    const base = searchParams.get('base') as Currency
    const symbols = searchParams.get('symbols')?.split(',') as Currency[]
    const result: {
      baseCurrency: Currency | null
      rates: Partial<Record<Currency, number>>
    } = {
      baseCurrency: base,
      rates: {},
    }
    for (const symbol of symbols) {
      const response = await fetch(`https://api.frankfurter.dev/v1/latest?base=${symbol}&symbols=${base}`)
      const data = await response.json()
      result.rates[symbol] = data.rates[base]
    }
    return NextResponse.json(result)
  } catch (error) {
    console.error('Get exchange data error:', (error as Error).message)

    return NextResponse.json({ error: 'Failed to fetch exchange rates' }, { status: 500 })
  }
}
