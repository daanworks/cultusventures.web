import { generateApiKey, validateEmail, createHash } from '@/utils/index'

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
