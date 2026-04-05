import { COOKIE_SESSION_NAME } from '@/constants'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { verifySession } from '@/utils/session'
import { UserService } from '@/services'

export const GET = async () => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(COOKIE_SESSION_NAME)?.value
    if (!token) return NextResponse.json({ user: null, error: 'Unauthorized' }, { status: 401 })
    const session = await verifySession(token)
    const user = await UserService.getById(session.sub)
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    return NextResponse.json({
      id: user.id,
      email: user.email,
      currency: user.currency,
      bankAccounts: user.bankAccounts,
      cash: user.cash,
      stocks: user.stocks,
      cryptos: user.cryptos,
      others: user.others,
      transactions: user.transactions,
    })
  } catch (error) {
    console.error('Get user data error:', (error as Error).message)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
