import { generateApiKey, validateEmail } from '@/utils/index'

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
