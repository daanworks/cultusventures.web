export type SessionPayload = {
  sub: string
  email: string
}

export type Currency = 'HUF' | 'USD' | 'EUR'

export type TransactionType = 'INCOME' | 'EXPENSE'

export type BankAccount = {
  id: string
  name: string | null
  bankName: string | null
  balance: number
  currency: Currency
}

export type Cash = {
  id: string
  name: string | null
  amount: number
  currency: Currency
}

export type Stock = {
  id: string
  symbol: string
  priceOnBuy: number
  numberOfShares: number
  currency: Currency
}

export type Crypto = {
  id: string
  symbol: string
  priceOnBuy: number
  amount: number
  currency: Currency
}

export type Other = {
  id: string
  name: string
  value: number
  currency: Currency
}

export type Transaction = {
  id: string
  name: string
  type: TransactionType
  value: number
  currency: Currency
}

export type PopulatedUser = {
  id: string
  email: string
  bankAccounts: BankAccount[]
  cash: Cash[]
  stocks: Stock[]
  cryptos: Crypto[]
  others: Other[]
  transactions: Transaction[]
}

export type SessionUser = {
  id: string
  email: string
}
