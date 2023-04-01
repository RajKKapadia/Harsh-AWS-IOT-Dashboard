import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const MachineQuery = createApi({
  reducerPath: 'queryApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_DB_URL}/machine` }),
  endpoints: (builder) => ({
    getMachineList: builder.query({
      query: () => `/all`,
    }),
  }),
})
// export const pokemonApi = createApi({
//   reducerPath: 'pokemonApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
//   endpoints: (builder) => ({
//     getPokemonByName: builder.query<Pokemon, string>({
//       query: (name) => `pokemon/${name}`,
//     }),
//   }),
// })

export const { useGetMachineListQuery } = MachineQuery
