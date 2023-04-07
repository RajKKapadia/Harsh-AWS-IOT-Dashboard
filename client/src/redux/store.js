import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { clientQuery } from './slice/clientQuery'
import { MachineQuery } from './slice/machineQuery'

export const store = configureStore({
  reducer: {
    [MachineQuery.reducerPath]: MachineQuery.reducer,
    [clientQuery.reducerPath]: clientQuery.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat([MachineQuery.middleware, clientQuery.middleware]),
})
