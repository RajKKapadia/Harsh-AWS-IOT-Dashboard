import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getAuthToken } from '../../utils/helperFunction/helperFunction'

export const MachineQuery = createApi({
  reducerPath: 'queryApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_DB_URL}/machine` }),
  endpoints: (builder) => ({
    getMachineList: builder.query({
      query: () => {
        const token = getAuthToken();
        return {
          url: `/all`,
          headers:{
            authorization:`${token}`
          }
        }},
    }),
    addMachine: builder.mutation({
      query: (body) => {
         const token = getAuthToken()
        return {
          url: '/create',
          method: 'POST',
           headers:{
            authorization:`${token}`
          },
          body,
        }
      },
    }),
    deleteMachine:builder.mutation({
      query:()=>{
         const token = getAuthToken()
        return {
          url: '/',
          headers: {
            authorization: `${token}`,
          },
        }
      }
    }),
    getMachineById:builder.mutation({
      query:(id)=>{
         const token = getAuthToken()
        return {
          url: `/one/${id}`,
          headers: {
            authorization: `${token}`,
          },
        }
      }
    }),
    updateMachine:builder.mutation({
      query:({id,body})=>{
         const token = getAuthToken()
        return {
          url: `/update/${id}`,
          method:'POST',
           headers:{
            authorization:`${token}`
          },
          body
        }
      }
    }),
    deleteMachine:builder.mutation({
      query:(id)=>{
         const token = getAuthToken()
        return {
          url: `/${id}`,
          method: 'DELETE',
          headers: {
            authorization: `${token}`,
          },
        }
      }
    })
  }),
})


export const { useGetMachineListQuery, useAddMachineMutation, useGetMachineByIdMutation, useUpdateMachineMutation, useDeleteMachineMutation } = MachineQuery
