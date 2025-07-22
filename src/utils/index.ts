import { randomBytes } from 'crypto'

export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const generateApiKey = () => randomBytes(32).toString('hex').toUpperCase()
