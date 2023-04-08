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
            authorization:token
          }
        }},
    }),
    addMachine: builder.mutation({
      query: (body) => {
        return {
          url: '/create',
          method: 'POST',
          body,
        }
      },
    }),
    deleteMachine:builder.mutation({
      query:()=>{
        return {
          url:'/'
        }
      }
    }),
    getMachineById:builder.mutation({
      query:(id)=>{
        return {
          url: `/one/${id}`,
        }
      }
    }),
    updateMachine:builder.mutation({
      query:({id,body})=>{
        return {
          url: `/update/${id}`,
          method:'POST',
          body
        }
      }
    }),
    deleteMachine:builder.mutation({
      query:(id)=>{
        return {
          url:`/${id}`,
          method:'DELETE'
        }
      }
    })
  }),
})


export const { useGetMachineListQuery, useAddMachineMutation, useGetMachineByIdMutation, useUpdateMachineMutation, useDeleteMachineMutation } = MachineQuery
