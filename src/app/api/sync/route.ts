import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 60

export const GET = async (req: NextRequest) => {
  const auth: string = req.headers.get('authorization') || ''
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.log('Sync error: ' + (error as Error).message)
    return NextResponse.json({ error: 'Sync error: ' + (error as Error).message }, { status: 500 })
  }
}

export const runtime = 'nodejs'
