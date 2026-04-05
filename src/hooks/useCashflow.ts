import { selectUser } from '@/store/ducks/user'
import { useAppSelector } from '@/store/hooks'
import { useMemo } from 'react'

export const useCashflow = () => {
  const user = useAppSelector(selectUser)
  const { incomeTotal, expenseTotal } = useMemo(() => {
    const totals = (user?.transactions || []).reduce(
      (result, transaction) => {
        if (transaction.type === 'INCOME') result.incomeTotal += transaction.value
        if (transaction.type === 'EXPENSE') result.expenseTotal += transaction.value
        return result
      },
      { incomeTotal: 0, expenseTotal: 0 },
    )
    return {
      ...totals,
      cashflow: totals.incomeTotal - totals.expenseTotal,
    }
  }, [user])
  return {
    incomeTotal,
    expenseTotal,
    cashflow: incomeTotal - expenseTotal,
  }
}
