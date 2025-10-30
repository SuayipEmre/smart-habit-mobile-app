import { UserSessionType } from '../../../types/UserSessionType';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


type initialStateType = {
    userSession: UserSessionType | null
}
const initialState : initialStateType = {
    userSession : null 
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        _setUserSession: (state, action : PayloadAction<UserSessionType | null>) => {
            state.userSession = action.payload;
        },
        _clearUserSession: (state) => {
            state.userSession = null;
        },
    },
})


export const { _setUserSession, _clearUserSession } = UserSlice.actions;
export default UserSlice.reducer;