import { store } from "@/store/app/store";
import { _clearUserSession, _setUserSession } from ".";
import { UserSessionType } from "@/types/UserSessionType";

export const setUserSession = (userSession : UserSessionType | null) => store.dispatch(_setUserSession(userSession))

export const clearUserSession = () => store.dispatch(_clearUserSession())