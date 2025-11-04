import { fetchBaseQuery, FetchBaseQueryError, FetchArgs, BaseQueryFn } from '@reduxjs/toolkit/query/react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { _clearUserSession, _setUserSession } from '@/store/features/user'
import { RootState } from '@/store/app/store'

// Base query (normal istek)
const rawBaseQuery = fetchBaseQuery({
  baseUrl: `${process.env.EXPO_PUBLIC_API_URL}`,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState
    const token = state.userSlice.userSession?.accessToken
    if (token) headers.set('Authorization', `Bearer ${token}`)
    headers.set('Content-Type', 'application/json')
    return headers
  },
})

// Token yenileyebilen base query
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    console.log('⚠️ Access token expired, trying refresh...')

    const storedSession = await AsyncStorage.getItem('userSession')
    const parsedSession = storedSession ? JSON.parse(storedSession) : null
    const refreshToken = parsedSession?.refreshToken

    if (!refreshToken) {
      console.log('❌ No refresh token found — user must log in again.')
      api.dispatch(_clearUserSession())
      await AsyncStorage.removeItem('userSession')
      return result
    }

    // Refresh isteği
    const refreshResult = await rawBaseQuery(
      {
        url: '/auth/refresh',
        method: 'POST',
        body: { refreshToken },
      },
      api,
      extraOptions
    )

    if (refreshResult.data && typeof refreshResult.data === 'object') {
      const data = refreshResult.data as { data?: { accessToken?: string } }
      const newAccessToken = data?.data?.accessToken

      if (newAccessToken && parsedSession) {
        console.log('✅ Access token refreshed successfully.')

        // Redux state ve AsyncStorage güncelle
        const newSession = { ...parsedSession, accessToken: newAccessToken }
        api.dispatch(_setUserSession(newSession))
        await AsyncStorage.setItem('userSession', JSON.stringify(newSession))

        // İsteği yeniden dene
        result = await rawBaseQuery(args, api, extraOptions)
      }
    } else {
      console.log('⛔ Refresh token expired — logging out user.')
      api.dispatch(_clearUserSession())
      await AsyncStorage.removeItem('userSession')
    }
  }

  return result
}
