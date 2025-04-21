import { formatPrice, generateApiKey, validateEmail } from '@/utils/index'

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
