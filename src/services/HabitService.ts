import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const baseEndPoint = `${process.env.EXPO_PUBLIC_API_URL}habit/`

export const HabitService = createApi({
    reducerPath: 'habit service',
    baseQuery: fetchBaseQuery({
        baseUrl: baseEndPoint,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as any)?.userSlice?.userSession?.token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({

        getUserHabits: builder.query({
            query: () => ({
                url: '/',
                method: 'GET',
            }),
        }),

        getHabitsOfTodays: builder.query({
            query: () => ({
                url: 'today',
                method: 'GET',
            }),
        }),

        completeHabit: builder.mutation({
            query: (habitId: string) => ({
                url: `complete/${habitId}`,
                method: 'POST',
            }),
          
        }),


    }),
})

export const {
    useGetUserHabitsQuery,
    useGetHabitsOfTodaysQuery,
    useCompleteHabitMutation
} = HabitService

export default HabitService