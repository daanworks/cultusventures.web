import { Currency } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@/store'
import api from '@/store/api'

type ExchangeState = {
  baseCurrency: Currency | null
  rates: Partial<Record<Currency, number>>
  isLoading: boolean
}

const initialState: ExchangeState = {
  baseCurrency: null,
  rates: {},
  isLoading: false,
}

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getExchange.matchPending, (state) => {
        state.isLoading = true
      })
      .addMatcher(api.endpoints.getExchange.matchFulfilled, (state, action) => {
        state.isLoading = false
        state.baseCurrency = action.payload.baseCurrency
        state.rates = action.payload.rates
      })
      .addMatcher(api.endpoints.getExchange.matchRejected, () => initialState)
      .addMatcher(api.endpoints.logout.matchFulfilled, () => initialState)
  },
})

export const selectExchange = (state: RootState) => state.exchange

const { reducer } = exchangeSlice

export default reducer
