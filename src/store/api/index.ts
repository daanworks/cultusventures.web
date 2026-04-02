import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PopulatedUser, SessionUser } from '@/types'

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
  }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetSessionQuery,
  useLazyGetSessionQuery,
  useGetUserQuery,
  useLazyGetUserQuery,
} = api

export default api
