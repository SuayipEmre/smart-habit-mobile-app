import { setUserSession } from "@/store/features/user/actions";
import { UserSessionType } from "@/types/UserSessionType";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const saveUserSessionToStorage = async(userSession : UserSessionType) => {
    try {
        await AsyncStorage.setItem('userSession', JSON.stringify(userSession))
        return true
    } catch (error) {
        console.log('Error saving user session to storage:', error);
        return false
    }
}


export const getUserSessionFromStorage = async() => {
  
    try {
        const userData = await AsyncStorage.getItem('userSession')
        if (userData) {
            return JSON.parse(userData) as UserSessionType
        }
    } catch (error) {
        console.log('Error retrieving user session from storage:', error);
        return null
    }
}


export const clearUserSessionFromStorage = async() => {
    try {
        await AsyncStorage.removeItem('userSession')
        setUserSession(null)
        return true
    } catch (error) {
        console.log('Error clearing user session from storage:', error);
        return false
    }
}