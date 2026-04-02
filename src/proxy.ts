import { NextRequest, NextResponse } from 'next/server'
import appConfig from './config'
import { COOKIE_SESSION_NAME } from '@/constants'
import { verifySession } from '@/utils/session'

export const proxy = async (req: NextRequest) => {
  const { pathname } = req.nextUrl
  const isApiPath = pathname.startsWith(appConfig.apiPath)
  const isGeneralNextPath = pathname.startsWith(appConfig.staticPaths.general)
  const isFaviconPath = pathname.startsWith(appConfig.staticPaths.favicon)
  if (isApiPath || isGeneralNextPath || isFaviconPath) return NextResponse.next()
  const token = req.cookies.get(COOKIE_SESSION_NAME)?.value
  if (!token) {
    if (pathname.startsWith(appConfig.uiPaths.login)) return NextResponse.next()
    return NextResponse.redirect(new URL(appConfig.uiPaths.login, req.url))
  }
  try {
    await verifySession(token)
    if (pathname.startsWith(appConfig.uiPaths.login))
      return NextResponse.redirect(new URL(appConfig.uiPaths.dashboard, req.url))
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL(appConfig.uiPaths.login, req.url))
  }
}

export const config = {
  matcher: '/:path*',
}
