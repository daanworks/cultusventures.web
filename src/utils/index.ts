import { randomBytes } from 'crypto'
import { SMA350_MULTIPLIER, SMA417_MULTIPLIER } from '@/constants'

export const formatPrice = (price: number): string => {
  if (isNaN(price) || price === null || price === undefined) {
    throw new Error('Invalid price value')
  }
  if (price < 0) {
    throw new Error('Price must be a positive number')
  }
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const generateApiKey = () => randomBytes(32).toString('hex').toUpperCase()

export const getTopLikelihoodPercentage = (ema111: number, sma350: number): number => {
  if (sma350 === 0 || ema111 === 0) return 0
  const scaledSMA350 = sma350 * SMA350_MULTIPLIER
  const ratio = ema111 / scaledSMA350
  const score = Math.min(1, ratio) * 100
  return parseFloat(score.toFixed(2))
}

export const getBottomLikelihoodPercentage = (ema310: number, sma417: number): number => {
  if (ema310 === 0 || sma417 === 0) return 0
  const scaledSMA417 = sma417 * SMA417_MULTIPLIER
  const ratio = scaledSMA417 / ema310
  const score = Math.min(1, ratio) * 100
  return parseFloat(score.toFixed(2))
}
