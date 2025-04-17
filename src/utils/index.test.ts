import { formatPrice } from '@/utils/index'

describe('formatPrice', () => {
  it('formats number correctly', () => {
    expect(formatPrice(84434)).toBe('$84,434.00')
  })
  it('formats negative number correctly', () => {
    expect(formatPrice(-84434)).toBe('-$84,434.00')
  })

  it('formats zero correctly', () => {
    expect(formatPrice(0)).toBe('$0.00')
  })

  it('formats decimal values correctly', () => {
    expect(formatPrice(1234.567)).toBe('$1,234.57')
    expect(formatPrice(1234.001)).toBe('$1,234.00')
  })

  it('formats large number correctly', () => {
    expect(formatPrice(1234567890)).toBe('$1,234,567,890.00')
  })
})
