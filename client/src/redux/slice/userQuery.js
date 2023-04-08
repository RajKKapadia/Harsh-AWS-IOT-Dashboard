import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userQuery = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_DB_URL}` }),
  endpoints: (builder) => ({
    getUserList: builder.query({
      query: () => `/user/all`,
    }),
    addUser: builder.mutation({
      query: ({ body }) => {
        return {
          url: '/user/create',
          method: 'POST',
          body,
        }
      },
    }),
    logInUser: builder.mutation({
      query: (payload) => {
        return {
          url: '/login',
          method: 'POST',
          body:payload,
        }
      },
    }),
  }),
})

export const { useGetUserListQuery, useAddUserMutation, useLogInUserMutation } = userQuery
