import { createApi } from '@reduxjs/toolkit/query/react'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'

const baseEndPoint = `${process.env.EXPO_PUBLIC_API_URL}auth/`
//
const AuthService = createApi({
    reducerPath: 'auth service',

    baseQuery: fetchBaseQuery({
        baseUrl: baseEndPoint,
    }),
    endpoints: (builder) => ({

        SendSigninRequest: builder.mutation({
            query: (body) => {
                return {
                    url: 'signin',
                    method: 'POST',
                    body,
                }
            }
        }),

        sendSignupRequest : builder.mutation({
            query : (body) => {
                return {
                    url : 'signup',
                    method : 'POST',
                    body,
                }
            }
        })
    })
})
export const {
    useSendSigninRequestMutation,
    useSendSignupRequestMutation
} = AuthService
export default AuthService