'use client'

import { useAppSelector } from '@/store/hooks'
import { selectUser } from '@/store/ducks/user'
import { useGetExchangeQuery, useGetSessionQuery, useGetUserQuery } from '@/store/api'
import { selectSession } from '@/store/ducks/session'
import { convertToBaseCurrency, getUserAssetCurrencies } from '@/utils/common'
import { selectExchange } from '@/store/ducks/exchange'
import Loading from '@/components/Loading'
import { config as fontAwesomeConfig } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Container from '@/components/Container'

fontAwesomeConfig.autoAddCss = false

const HomePage = () => {
  useGetSessionQuery()
  const session = useAppSelector(selectSession)
  const userQuery = useGetUserQuery(undefined, { skip: !session.isAuthenticated })
  const user = useAppSelector(selectUser)
  const exchangeQuery = useGetExchangeQuery(
    {
      base: user?.currency || 'HUF',
      symbols: getUserAssetCurrencies(user) || [],
    },
    {
      skip: !user,
    },
  )
  const exchange = useAppSelector(selectExchange)

  if (process.env.NODE_ENV === 'production') return <h1>Not in prod yet...</h1>

  if (
    !session.isChecked ||
    session.isLoading ||
    (session.isAuthenticated && (userQuery.isLoading || exchangeQuery.isLoading))
  )
    return <Loading />

  return (
    <Container>
      <section className="mb-6">
        <h2 className="mb-3 text-xl font-semibold">Bank Accounts</h2>
        <div className="overflow-x-auto rounded-2xl border">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Bank Name</th>
                <th className="p-3 text-left">Balance</th>
                <th className="p-3 text-left">Currency</th>
                <th className="p-3 text-left">Total in {user?.currency}</th>
              </tr>
            </thead>
            <tbody>
              {user &&
                user.bankAccounts.map((account) => (
                  <tr key={account.id} className="border-t">
                    <td className="p-3">{account.name}</td>
                    <td className="p-3">{account.bankName}</td>
                    <td className="p-3">{account.balance}</td>
                    <td className="p-3">{account.currency}</td>
                    <td className="p-3">
                      {convertToBaseCurrency(account.balance, account.currency, user.currency, exchange.rates)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="mb-6">
        <h2 className="mb-3 text-xl font-semibold">Cash</h2>
        <div className="overflow-x-auto rounded-2xl border">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Currency</th>
                <th className="p-3 text-left">Total in {user?.currency}</th>
              </tr>
            </thead>
            <tbody>
              {user &&
                user.cash.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">{item.amount}</td>
                    <td className="p-3">{item.currency}</td>
                    <td className="p-3">
                      {convertToBaseCurrency(item.amount, item.currency, user.currency, exchange.rates)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="mb-6">
        <h2 className="mb-3 text-xl font-semibold">Stocks</h2>
        <div className="overflow-x-auto rounded-2xl border">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Symbol</th>
                <th className="p-3 text-left">Price on Buy</th>
                <th className="p-3 text-left">Number of Shares</th>
                <th className="p-3 text-left">Currency</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Total in {user?.currency}</th>
              </tr>
            </thead>
            <tbody>
              {user &&
                user.stocks.length &&
                user.stocks.map((stock) => (
                  <tr key={stock.id} className="border-t">
                    <td className="p-3">{stock.symbol}</td>
                    <td className="p-3">{stock.priceOnBuy}</td>
                    <td className="p-3">{stock.numberOfShares}</td>
                    <td className="p-3">{stock.currency}</td>
                    <td className="p-3">{stock.numberOfShares * stock.priceOnBuy}</td>
                    <td className="p-3">
                      {convertToBaseCurrency(
                        stock.numberOfShares * stock.priceOnBuy,
                        stock.currency,
                        user.currency,
                        exchange.rates,
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="mb-6">
        <h2 className="mb-3 text-xl font-semibold">Cryptos</h2>
        <div className="overflow-x-auto rounded-2xl border">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Symbol</th>
                <th className="p-3 text-left">Price on Buy</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Currency</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Total in {user?.currency}</th>
              </tr>
            </thead>
            <tbody>
              {user &&
                user.cryptos.map((crypto) => (
                  <tr key={crypto.id} className="border-t">
                    <td className="p-3">{crypto.symbol}</td>
                    <td className="p-3">{crypto.priceOnBuy}</td>
                    <td className="p-3">{crypto.amount}</td>
                    <td className="p-3">{crypto.currency}</td>
                    <td className="p-3">{crypto.amount * crypto.priceOnBuy}</td>
                    <td className="p-3">
                      {convertToBaseCurrency(
                        crypto.amount * crypto.priceOnBuy,
                        crypto.currency,
                        user.currency,
                        exchange.rates,
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="mb-6">
        <h2 className="mb-3 text-xl font-semibold">Other Assets</h2>
        <div className="overflow-x-auto rounded-2xl border">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Value</th>
                <th className="p-3 text-left">Currency</th>
                <th className="p-3 text-left">Total in {user?.currency}</th>
              </tr>
            </thead>
            <tbody>
              {user &&
                user.others.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">{item.value}</td>
                    <td className="p-3">{item.currency}</td>
                    <td className="p-3">
                      {convertToBaseCurrency(item.value, item.currency, user.currency, exchange.rates)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="mb-6">
        <h2 className="mb-3 text-xl font-semibold">Transactions</h2>
        <div className="overflow-x-auto rounded-2xl border">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Value</th>
                <th className="p-3 text-left">Currency</th>
                <th className="p-3 text-left">Total in {user?.currency}</th>
              </tr>
            </thead>
            <tbody>
              {user &&
                user.transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-t">
                    <td className="p-3">{transaction.name}</td>
                    <td className="p-3">{transaction.type}</td>
                    <td className="p-3">{transaction.value}</td>
                    <td className="p-3">{transaction.currency}</td>
                    <td className="p-3">
                      {convertToBaseCurrency(transaction.value, transaction.currency, user.currency, exchange.rates)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </Container>
  )
}

export default HomePage
