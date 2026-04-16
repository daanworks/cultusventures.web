import { validateEmail } from '@/utils/common'

describe('validateEmail', () => {
  it('returns false for empty email', async () => {
    expect(validateEmail('')).toStrictEqual(false)
  })

  it('returns false for non valid email', async () => {
    expect(validateEmail('test@test')).toStrictEqual(false)
    expect(validateEmail('test')).toStrictEqual(false)
    expect(validateEmail('test@test.')).toStrictEqual(false)
  })

  it('returns true for valid email', async () => {
    expect(validateEmail('test@test.com')).toStrictEqual(true)
  })
})
