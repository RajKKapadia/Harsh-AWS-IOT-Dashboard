import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { queryApi } from './slice/query'


export const store = configureStore({
  reducer:{
    [queryApi.reducerPath]:queryApi.reducer
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false}).concat([queryApi.middleware])
})