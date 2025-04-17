import { formatPrice } from '@/utils/index'

describe('formatPrice', () => {
  it('formats number correctly', () => {
    expect(formatPrice(84434)).toBe('$84,434.00')
  })
})
