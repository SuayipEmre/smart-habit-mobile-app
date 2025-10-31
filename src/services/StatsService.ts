import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



const baseEndPoint = `${process.env.EXPO_PUBLIC_API_URL}stats/`

export const StatsService = createApi({
  reducerPath: 'userService',
  baseQuery: fetchBaseQuery({
    baseUrl : baseEndPoint,
    prepareHeaders: (headers, { getState }) => {
      // Redux state içinden token al
      const token = (getState() as any)?.userSlice?.userSession?.token

      // Eğer token varsa header’a ekle
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    getUserStreakStat: builder.query({
      query: () => ({
        url: 'streak',
        method: 'GET',
      }),
    }),

    getUserProgressStat : builder.query({
      query : () => ({
        url : 'progress',
        method : 'GET'
      })
    })

  }),
})

export const { useGetUserStreakStatQuery, useGetUserProgressStatQuery } = StatsService

export default StatsService