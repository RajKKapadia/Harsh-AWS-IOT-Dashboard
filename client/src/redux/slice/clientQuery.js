import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const clientQuery = createApi({
  reducerPath: 'clientApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_DB_URL}/client` }),
  endpoints: (builder) => ({
    getClientList: builder.query({
      query: () => `/all`,
    }),
    addClient: builder.mutation({
      query: (body) => {
        return {
          url: '/create',
          method: 'POST',
          body,
        }
      },
    }),
    deleteClient: builder.mutation({
      query: () => {
        return {
          url: '/',
        }
      },
    }),
    getClientById: builder.mutation({
      query: (id) => {
        return {
          url: `/one/${id}`,
        }
      },
    }),
    updateClient: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `/update/${id}`,
          method: 'POST',
          body,
        }
      },
    }),
  }),
})

export const { useGetClientListQuery, useAddClientMutation, useGetClientByIdMutation, useUpdateClientMutation } = clientQuery
