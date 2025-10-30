import { configureStore } from '@reduxjs/toolkit'
import UserSlice from '../features/user'
import AuthService from '@/services/AuthService'
export const store = configureStore({
    reducer: {
        userSlice: UserSlice,
        [AuthService.reducerPath]: AuthService.reducer,


    },
    middleware: (getDefaultMiddleware) => {
        return (
            getDefaultMiddleware()
                .concat(AuthService.middleware)
            )
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
