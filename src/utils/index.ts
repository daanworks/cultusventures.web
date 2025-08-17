import crypto, { randomBytes } from 'crypto'

export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const generateApiKey = (): string => randomBytes(32).toString('hex').toUpperCase()

export const createHash = (email: string): string => crypto.createHash('md5').update(email.toLowerCase()).digest('hex')
