import { validateEmail } from '@/utils/common'

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
