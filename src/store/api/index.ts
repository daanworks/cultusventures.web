import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Currency, PopulatedUser, SessionUser } from '@/types'

type LoginRequest = {
  email: string
  password: string
}

type LoginResponse = {
  message: string
  user: SessionUser
}

type SessionResponse = {
  user: SessionUser | null
}

type ExchangeRequest = {
  base: Currency
  symbols: Currency[]
}

type ExchangeResponse = {
  baseCurrency: Currency
  rates: Partial<Record<Currency, number>>
}

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    credentials: 'include',
  }),
  tagTypes: ['Session', 'User'],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Session', 'User'],
    }),

    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Session', 'User'],
    }),

    getSession: builder.query<SessionResponse, void>({
      query: () => ({
        url: '/session',
        method: 'GET',
      }),
      providesTags: ['Session'],
    }),

    getUser: builder.query<PopulatedUser, void>({
      query: () => ({
        url: '/user',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getExchange: builder.query<ExchangeResponse, ExchangeRequest>({
      query: ({ base, symbols }) => ({
        url: `/exchange?base=${base}&symbols=${symbols.join(',')}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetSessionQuery,
  useLazyGetSessionQuery,
  useGetUserQuery,
  useLazyGetUserQuery,
  useGetExchangeQuery,
  useLazyGetExchangeQuery,
} = api

export default api
