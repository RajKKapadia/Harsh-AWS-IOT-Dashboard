import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getAuthToken } from '../../utils/helperFunction/helperFunction'

export const MachineTagsQuery = createApi({
  reducerPath: 'machineTagsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_DB_URL}/tag` }),
  endpoints: (builder) => ({
    getMachineTags: builder.mutation({
      query: (machineId) => {
        const token = getAuthToken()
        return {
          url: `/get/${machineId}`,
          headers: {
            authorization: `${token}`,
          },
 
        }
      },
    }),

  }),
})

export const { useGetMachineTagsMutation } =
  MachineTagsQuery
