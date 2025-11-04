import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './BaseQuery'


export const StatsService = createApi({
  reducerPath: 'userService',
  baseQuery:baseQueryWithReauth,
  endpoints: (builder) => ({
    getUserStreakStat: builder.query({
      query: () => ({
        url: 'stats/streak',
        method: 'GET',
      }),
    }),

    getUserProgressStat : builder.query({
      query : () => ({
        url : 'stats/progress',
        method : 'GET'
      })
    })

  }),
})

export const { useGetUserStreakStatQuery, useGetUserProgressStatQuery } = StatsService

export default StatsService