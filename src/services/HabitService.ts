import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseEndPoint = `${process.env.EXPO_PUBLIC_API_URL}habit/`;

export const HabitService = createApi({
  reducerPath: 'habitService',
  baseQuery: fetchBaseQuery({
    baseUrl: baseEndPoint,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any)?.userSlice?.userSession?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  // 🔹 TAG sistemi aktif
  tagTypes: ['Habit'],

  endpoints: (builder) => ({
    // 🟢 Habits list (bu cache’lenir)
    getUserHabits: builder.query({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
      providesTags: ['Habit'], // ✅ cache’e tag ekler
    }),

    // 🟣 Today's habits
    getHabitsOfTodays: builder.query({
      query: () => ({
        url: 'today',
        method: 'GET',
      }),
      providesTags: ['Habit'], // aynı tag
    }),

    // 🟠 Habit tamamlama
    completeHabit: builder.mutation({
      query: (habitId: string) => ({
        url: `complete/${habitId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Habit'], // ✅ success → cache invalidation
    }),

    // 🔵 Habit oluşturma
    createHabit: builder.mutation({
      query: (body) => ({
        url: `create`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Habit'], // ✅ success → liste yeniden çekilir
    }),
  }),
});

export const {
  useGetUserHabitsQuery,
  useGetHabitsOfTodaysQuery,
  useCompleteHabitMutation,
  useCreateHabitMutation,
} = HabitService;

export default HabitService;
