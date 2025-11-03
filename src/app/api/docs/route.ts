import { NextResponse } from 'next/server'
import spec from '@/templates/swagger.json'

export const GET = async () => NextResponse.json(spec)
