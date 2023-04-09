import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getAuthToken } from '../../utils/helperFunction/helperFunction'

export const endUserQuery = createApi({
  reducerPath: 'endUserApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_DB_URL}/endUser` }),
  endpoints: (builder) => ({
    getEndUserList: builder.query({
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
    addEndUser: builder.mutation({
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
    deleteEndUser: builder.mutation({
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
    getEndUserById: builder.mutation({
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
    updateEndUser: builder.mutation({
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
    deleteEndUser: builder.mutation({
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

export const { useGetEndUserListQuery, useAddEndUserMutation, useGetEndUserByIdMutation, useUpdateEndUserMutation, useDeleteEndUserMutation } = endUserQuery
