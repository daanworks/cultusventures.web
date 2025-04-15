import { NextRequest, NextResponse } from 'next/server'
import { ApiKeyService } from '@/services'

export const GET = async (req: NextRequest) => {
  try {
    const authHeader = req.headers.get('authorization') || req.headers.get('Authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':')
    const [user, pass] = auth
    if (user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASSWORD) {
      const response = await ApiKeyService.getAll()
      const data = response.map((record) => record.apiKey)
      return NextResponse.json(data, { status: 200 })
    } else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 403 })
    }
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
