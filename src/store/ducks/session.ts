import { SessionUser } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/store'
import api from '@/store/api'

type SessionState = {
  isChecked: boolean
  isLoading: boolean
  isAuthenticated: boolean
  user: SessionUser | null
}

const initialState: SessionState = {
  isChecked: false,
  isLoading: false,
  isAuthenticated: false,
  user: null,
}

const sessionSlice = createSlice({
  name: 'session',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getSession.matchPending, (state) => {
        state.isLoading = true
      })
      .addMatcher(api.endpoints.getSession.matchFulfilled, (state, action) => {
        state.isLoading = false
        state.isChecked = true
        state.isAuthenticated = !!action.payload.user
        state.user = action.payload.user
      })
      .addMatcher(api.endpoints.getSession.matchRejected, (state) => {
        state.isLoading = false
        state.isChecked = true
        state.isAuthenticated = false
        state.user = null
      })
      .addMatcher(api.endpoints.login.matchPending, (state) => {
        state.isLoading = true
      })
      .addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
        state.isLoading = false
        state.isChecked = true
        state.isAuthenticated = true
        state.user = action.payload.user
      })
      .addMatcher(api.endpoints.login.matchRejected, (state) => {
        state.isLoading = false
        state.isChecked = true
        state.isAuthenticated = false
        state.user = null
      })
      .addMatcher(api.endpoints.logout.matchPending, (state) => {
        state.isLoading = true
      })
      .addMatcher(api.endpoints.logout.matchFulfilled, (state) => {
        state.isLoading = false
        state.isChecked = true
        state.isAuthenticated = false
        state.user = null
      })
      .addMatcher(api.endpoints.logout.matchRejected, (state) => {
        state.isLoading = false
      })
  },
})

export const selectSession = (state: RootState) => state.session

const { reducer } = sessionSlice

export default reducer
