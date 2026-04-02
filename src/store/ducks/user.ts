import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@/store'
import type { PopulatedUser } from '@/types'
import api from '../api'

export type UserState = {
  data: PopulatedUser | null
}

const initialState: UserState = {
  data: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getUser.matchFulfilled, (state, action) => {
        state.data = action.payload
      })
      .addMatcher(api.endpoints.getUser.matchRejected, (state) => {
        state.data = null
      })
      .addMatcher(api.endpoints.logout.matchFulfilled, (state) => {
        state.data = null
      })
  },
})

export const selectUser = (state: RootState) => state.user.data

const { reducer } = userSlice

export default reducer
