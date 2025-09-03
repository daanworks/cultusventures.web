import { NextRequest, NextResponse } from 'next/server'
import { ApiKeyService } from '@/services'
import { ApiKey } from '@prisma/client'

export const GET = async (req: NextRequest) => {
  try {
    const auth: string = req.headers.get('authorization') || req.headers.get('Authorization') || ''
    if (!auth) return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    const credentials: string[] = Buffer.from(auth.split(' ')[1], 'base64').toString().split(':')
    const [user, pass]: string[] = credentials
    if (user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASSWORD) {
      const response: ApiKey[] | null = await ApiKeyService.getAll()
      const data: string[] = (response || []).map((record: ApiKey) => record.apiKey)
      return NextResponse.json(data, { status: 200 })
    } else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 403 })
    }
  } catch (error) {
    console.error('Error getting api key', (error as Error).message)
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
