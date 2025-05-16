import {
  formatPrice,
  generateApiKey,
  validateEmail,
  getTopLikelihoodPercentage,
  getBottomLikelihoodPercentage,
} from '@/utils/index'

describe('formatPrice', () => {
  it('formats number correctly', () => {
    expect(formatPrice(84434)).toBe('$84,434.00')
  })

  it('throws error for non-numeric input', () => {
    // @ts-expect-error – intentionally passing wrong type
    expect(() => formatPrice('string')).toThrow('Invalid price value')
    // @ts-expect-error – intentionally passing undefined value
    expect(() => formatPrice()).toThrow('Invalid price value')
  })

  it('throws error for negative values (if desired)', () => {
    expect(() => formatPrice(-100)).toThrow('Price must be a positive number')
  })

  it('formats decimal values correctly', () => {
    expect(formatPrice(1234.567)).toBe('$1,234.57')
    expect(formatPrice(1234.001)).toBe('$1,234.00')
  })

  it('formats large number correctly', () => {
    expect(formatPrice(1234567890)).toBe('$1,234,567,890.00')
  })
})

describe('validateEmail', () => {
  it('returns false for empty email', () => {
    expect(validateEmail('')).toStrictEqual(false)
  })

  it('returns false for non valid email', () => {
    expect(validateEmail('test@test')).toStrictEqual(false)
    expect(validateEmail('test')).toStrictEqual(false)
    expect(validateEmail('test@test.')).toStrictEqual(false)
  })

  it('returns true for valid email', () => {
    expect(validateEmail('test@test.com')).toStrictEqual(true)
  })
})

describe('generateApiKey', () => {
  it('should return a 64-character uppercase hex string', () => {
    const key = generateApiKey()
    expect(key.length).toBe(64)
    expect(key).toMatch(/^[A-F0-9]{64}$/)
  })

  it('should generate a different key each time', () => {
    const key1 = generateApiKey()
    const key2 = generateApiKey()
    expect(key1).not.toEqual(key2)
  })
})

describe('getTopLikelihoodPercentage', () => {
  test('returns correct percentage when ema111 is below 2x sma350', () => {
    const score = getTopLikelihoodPercentage(17792, 11949.5)
    expect(score).toBeCloseTo(74.45, 2)
  })

  test('returns 100 when ema111 equals 2x sma350', () => {
    const score = getTopLikelihoodPercentage(20000, 10000)
    expect(score).toBe(100)
  })

  test('returns 100 when ema111 is above 2x sma350', () => {
    const score = getTopLikelihoodPercentage(45168.98, 22577.74)
    expect(score).toBe(100)
  })

  test('returns 0 when ema111 is 0', () => {
    const score = getTopLikelihoodPercentage(0, 10000)
    expect(score).toBe(0)
  })

  test('returns 0 when sma350 is 0 (division by zero handled)', () => {
    const score = getTopLikelihoodPercentage(10000, 0)
    expect(score).toBe(0) // This will break
  })

  test('handles NaN or invalid inputs gracefully', () => {
    const score = getTopLikelihoodPercentage(NaN, 10000)
    expect(isNaN(score)).toBe(true)
  })
})

describe('getBottomLikelihoodPercentage', () => {
  test('returns correct percentage when scaled 417‑SMA is below 310‑EMA', () => {
    const score = getBottomLikelihoodPercentage(16_000, 15_500)
    expect(score).toBeCloseTo(72.37, 2)
  })
  test('returns 100 when scaled 417‑SMA equals 310‑EMA', () => {
    // Find the un‑scaled SMA that makes the two lines equal
    const ema310 = 16_000
    const sma417Equal = ema310 / 0.747
    const score = getBottomLikelihoodPercentage(ema310, sma417Equal)
    expect(score).toBe(100)
  })
  test('returns 100 when scaled 417‑SMA is above 310‑EMA', () => {
    const score = getBottomLikelihoodPercentage(16_000, 22_000) // 22 000×0.747 > 16 000
    expect(score).toBe(100)
  })
  test('returns 0 when 417‑SMA is 0', () => {
    const score = getBottomLikelihoodPercentage(16_000, 0)
    expect(score).toBe(0)
  })
  test('returns null when 310‑EMA is 0 (division by zero handled)', () => {
    const score = getBottomLikelihoodPercentage(0, 15_000)
    expect(score).toBe(0)
  })
})
