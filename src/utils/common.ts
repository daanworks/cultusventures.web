import { Currency, PopulatedUser } from '@/types'

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

export const getUserAssetCurrencies = (user: PopulatedUser | null): Currency[] => {
  if (!user) return []
  const currencies: Currency[] = [...user.bankAccounts, ...user.cash, ...user.stocks, ...user.cryptos, ...user.others]
    .map((asset) => asset.currency)
    .filter((currency: Currency) => currency !== user.currency)
  return [...new Set<Currency>(currencies)]
}

export const convertToBaseCurrency = (
  amount: number,
  fromCurrency: Currency,
  baseCurrency: Currency,
  rates: Partial<Record<Currency, number>>,
): number => {
  if (fromCurrency === baseCurrency) return amount
  const rate = rates[fromCurrency]
  if (typeof rate !== 'number') return 0
  return amount * rate
}

export const formatCurrencyValue = (value: number, currency: Currency): string => {
  if (currency === 'HUF') {
    const formattedNumber = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value)
    return `${formattedNumber} HUF`
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value)
}
