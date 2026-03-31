export const validateEmail = async (email: string): Promise<boolean> => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!regex.test(email)) return false
  const tld = email.split('.').pop()?.toLowerCase()
  if (!tld) return false
  const validTldsResponse = await fetch('https://data.iana.org/TLD/tlds-alpha-by-domain.txt')
  const validTldsData = await validTldsResponse.text()
  const validTlds = validTldsData
    .split('\n')
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => line.toLowerCase())
  return validTlds.includes(tld)
}
