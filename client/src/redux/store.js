import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { clientQuery } from './slice/clientQuery'
import { endUserQuery } from './slice/endUserQuery'
import { MachineQuery } from './slice/machineQuery'
import { MachineTagsQuery } from './slice/machineTagQuery'
import { userQuery } from './slice/userQuery'

export const store = configureStore({
  reducer: {
    [MachineQuery.reducerPath]: MachineQuery.reducer,
    [clientQuery.reducerPath]: clientQuery.reducer,
    [endUserQuery.reducerPath]: endUserQuery.reducer,
    [userQuery.reducerPath]: userQuery.reducer,
    [MachineTagsQuery.reducerPath]: MachineTagsQuery.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      MachineQuery.middleware,
      clientQuery.middleware,
      endUserQuery.middleware,
      userQuery.middleware,
      MachineTagsQuery.middleware
    ]),
})
