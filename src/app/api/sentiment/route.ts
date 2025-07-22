import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
