import { configureStore } from '@reduxjs/toolkit'
import sessionReducer from './ducks/session'
import userReducer from './ducks/user'
import exchangeReducer from './ducks/exchange'
import api from './api'

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    user: userReducer,
    exchange: exchangeReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
