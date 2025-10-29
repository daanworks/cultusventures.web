import { generateApiKey, validateEmail, createHash, parseDate } from '@/utils/index'

describe('validateEmail', () => {
  it('returns false for empty email', async () => {
    expect(await validateEmail('')).toStrictEqual(false)
  })

  it('returns false for non valid email', async () => {
    expect(await validateEmail('test@test')).toStrictEqual(false)
    expect(await validateEmail('test')).toStrictEqual(false)
    expect(await validateEmail('test@test.')).toStrictEqual(false)
    expect(await validateEmail('test@test.nonValidEnding')).toStrictEqual(false)
  })

  it('returns true for valid email', async () => {
    expect(await validateEmail('test@test.com')).toStrictEqual(true)
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

describe('createHash', () => {
  it('should be case insensitive', () => {
    const lower = createHash('test@example.com')
    const upper = createHash('TEST@EXAMPLE.COM')
    expect(lower).toBe(upper)
  })
  it('should produce consistent results for the same email', () => {
    const email = 'test@example.com'
    expect(createHash(email)).toBe(createHash(email))
  })
  it('should return a 32-character hexadecimal string', () => {
    const hash = createHash('test@example.com')
    expect(hash).toMatch(/^[a-f0-9]{32}$/)
  })
})

describe('parseDate', () => {
  it('returns null when value is null', () => {
    expect(parseDate(null)).toBeNull()
  })

  it('returns null when value is an empty string', () => {
    expect(parseDate('')).toBeNull()
  })

  it('returns a valid Date object for a YYYY-MM-DD string', () => {
    const dateStr = '2025-10-29'
    const result = parseDate(dateStr)
    expect(result).toBeInstanceOf(Date)
    expect(result?.toISOString().startsWith('2025-10-29')).toBe(true)
  })

  it('returns null for an invalid date string', () => {
    const dateStr = 'not-a-date'
    expect(parseDate(dateStr)).toBeNull()
  })

  it('returns null for a malformed date string (e.g. month 13)', () => {
    expect(parseDate('2025-13-01')).toBeNull()
  })
})
