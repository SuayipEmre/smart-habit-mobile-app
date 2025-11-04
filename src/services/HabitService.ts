import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './BaseQuery';


export const HabitService = createApi({
  reducerPath: 'habitService',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Habit'],

  endpoints: (builder) => ({

    getUserHabits: builder.query({
      query: () => ({
        url: 'habit',
        method: 'GET',
      }),
      providesTags: ['Habit'],
    }),

    getHabitsOfTodays: builder.query({
      query: () => ({
        url: 'habit/today',
        method: 'GET',
      }),
      providesTags: ['Habit'],
    }),

    completeHabit: builder.mutation({
      query: (habitId: string) => ({
        url: `habit/complete/${habitId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Habit'], // ✅ success → cache invalidation
    }),

    createHabit: builder.mutation({
      query: (body) => ({
        url: `habit/create`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Habit'],
    }),

    updateHabit: builder.mutation({
      query: ({ title, description, frequency, remindertime, habitId }: {
        title: string,
        description: string,
        frequency: string,
        remindertime: string | null,
        habitId: string,
      }) => ({
        url: `habit/update/${habitId}`,
        method: 'PUT',
        body: {
          title,
          description,
          frequency,
          reminderTime : remindertime
        }
      }),
      invalidatesTags: ['Habit'],
    }),

    deleteHabit: builder.mutation({
      query: (habitId : string) => ({
        url: `habit/delete/${habitId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Habit'],
    }),
  }),
});

export const {
  useGetUserHabitsQuery,
  useGetHabitsOfTodaysQuery,
  useCompleteHabitMutation,
  useCreateHabitMutation,
  useUpdateHabitMutation,
  useDeleteHabitMutation
} = HabitService;

export default HabitService;
