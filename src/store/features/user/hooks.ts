import { RootState } from "@/store/app/store";
import { useSelector } from "react-redux";

export const useUserSession = () => useSelector((state : RootState) =>  state.userSlice.userSession);