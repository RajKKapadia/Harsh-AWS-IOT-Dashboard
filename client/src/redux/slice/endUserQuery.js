import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const endUserQuery = createApi({
  reducerPath: 'endUserApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_DB_URL}/endUser` }),
  endpoints: (builder) => ({
    getEndUserList: builder.query({
      query: () => `/all`,
    }),
    addEndUser: builder.mutation({
      query: (body) => {
        return {
          url: '/create',
          method: 'POST',
          body,
        }
      },
    }),
    deleteEndUser: builder.mutation({
      query: () => {
        return {
          url: '/',
        }
      },
    }),
    getEndUserById: builder.mutation({
      query: (id) => {
        return {
          url: `/one/${id}`,
        }
      },
    }),
    updateEndUser: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `/update/${id}`,
          method: 'POST',
          body,
        }
      },
    }),
    deleteEndUser: builder.mutation({
      query: (id) => {
        return {
          url: `/${id}`,
          method: 'DELETE',
        }
      },
    }),
  }),
})

export const { useGetEndUserListQuery, useAddEndUserMutation, useGetEndUserByIdMutation, useUpdateEndUserMutation, useDeleteEndUserMutation } = endUserQuery
