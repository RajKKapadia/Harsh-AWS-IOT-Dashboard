import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { clientQuery } from './slice/clientQuery'
import { endUserQuery } from './slice/endUserQuery'
import { MachineQuery } from './slice/machineQuery'

export const store = configureStore({
  reducer: {
    [MachineQuery.reducerPath]: MachineQuery.reducer,
    [clientQuery.reducerPath]: clientQuery.reducer,
    [endUserQuery.reducerPath]: endUserQuery.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([MachineQuery.middleware, clientQuery.middleware, endUserQuery.middleware]),
})
