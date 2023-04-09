import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getAuthToken } from '../../utils/helperFunction/helperFunction'

export const clientQuery = createApi({
  reducerPath: 'clientApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_DB_URL}/client` }),
  endpoints: (builder) => ({
    getClientList: builder.query({
      query: () => {
        const token = getAuthToken()
        return {
          url: `/all`,
          headers: {
            authorization: `${token}`,
          },
        }
      },
    }),
    addClient: builder.mutation({
      query: (body) => {
        const token = getAuthToken()
        return {
          url: '/create',
          method: 'POST',
          body,
          headers: {
            authorization: `${token}`,
          },
        }
      },
    }),
    deleteClient: builder.mutation({
      query: () => {
        const token = getAuthToken()
        return {
          url: '/',
          headers: {
            authorization: `${token}`,
          },
        }
      },
    }),
    getClientById: builder.mutation({
      query: (id) => {
        const token = getAuthToken()
        return {
          url: `/one/${id}`,
          headers: {
            authorization: `${token}`,
          },
        }
      },
    }),
    updateClient: builder.mutation({
      query: ({ id, body }) => {
        const token = getAuthToken()
        return {
          url: `/update/${id}`,
          method: 'POST',
          body,
          headers: {
            authorization: `${token}`,
          },
        }
      },
    }),
    deleteClient: builder.mutation({
      query: (id) => {
        const token = getAuthToken()
        return {
          url: `/${id}`,
          method: 'DELETE',
          headers: {
            authorization: `${token}`,
          },
        }
      },
    }),
  }),
})

export const { useGetClientListQuery, useAddClientMutation, useGetClientByIdMutation, useUpdateClientMutation, useDeleteClientMutation } = clientQuery
