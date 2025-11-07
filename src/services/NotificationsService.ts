import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./BaseQuery";

export const NotificationService = createApi({
  reducerPath: "notificationApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Notifications"],
  endpoints: (builder) => ({
    updateExpoPushToken: builder.mutation({
      query: (token: string) => ({
        url: "user/update-expo-push-token",
        method: "POST",
        body: { token },
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const { useUpdateExpoPushTokenMutation } = NotificationService;
