import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { MachineQuery } from './slice/machineQuery'

export const store = configureStore({
  reducer: {
    [MachineQuery.reducerPath]: MachineQuery.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat([MachineQuery.middleware]),
})
