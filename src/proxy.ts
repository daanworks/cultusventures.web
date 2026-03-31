import { NextRequest, NextResponse } from 'next/server'
import NodeCache from 'node-cache'

const cache = new NodeCache({ stdTTL: 60 })

export const proxy = async (req: NextRequest) => {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || 'unknown'
  const requestCount = (cache.get(ip) as number) || 0
  if (requestCount >= 10) return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
  cache.set(ip, requestCount + 1)
  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
