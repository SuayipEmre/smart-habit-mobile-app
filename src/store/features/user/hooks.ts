import { RootState } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";

export const useUserSession = () => useSelector((state : RootState) =>  state.userSlice.userSession);