import { SessionPayload } from '@/types'
import { jwtVerify, SignJWT } from 'jose'

export const signSession = async (payload: SessionPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(new TextEncoder().encode(process.env.JWT_SECRET))
}

export const verifySession = async (token: string): Promise<SessionPayload> => {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))
  return payload as SessionPayload
}
