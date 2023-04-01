import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

export const queryApi = createApi({
  reducerPath:'queryApi',
  baseQuery:fetchBaseQuery({baseUrl:process.env}),
  endpoints:(builder)=>({
    getTags:builder.query({
      query:()=>`/tags`
    })
  })
})

export const { useGetTagsQuery } = queryApi