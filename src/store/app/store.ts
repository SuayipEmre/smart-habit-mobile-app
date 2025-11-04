import { StatsService } from './../../services/StatsService';
import { configureStore } from '@reduxjs/toolkit'
import UserSlice from '../features/user'
import AuthService from '@/services/AuthService'
import HabitService from '@/services/HabitService';
import HabitSlice from '../features/habit'

export const store = configureStore({
    reducer: {
        userSlice: UserSlice,
        habitSlice : HabitSlice,
        [AuthService.reducerPath]: AuthService.reducer,
        [StatsService.reducerPath]: StatsService.reducer,
        [HabitService.reducerPath] : HabitService.reducer


    },
    middleware: (getDefaultMiddleware) => {
        return (
            getDefaultMiddleware()
                .concat(AuthService.middleware)
                .concat(StatsService.middleware)
                .concat(HabitService.middleware)
            )
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
