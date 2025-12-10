import { NextRequest, NextResponse } from 'next/server'
import { UserService } from '@/services'
import { User } from '@prisma/client'

export const maxDuration = 60

export const GET = async (req: NextRequest) => {
  const auth: string = req.headers.get('authorization') || ''
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const subscribers: User[] = await UserService.getAll({})
    return NextResponse.json(subscribers, { status: 200 })
  } catch (error) {
    console.log('Sync error: ' + (error as Error).message)
    return NextResponse.json({ error: 'Sync error: ' + (error as Error).message }, { status: 500 })
  }
}
