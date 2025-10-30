
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { AuthNavigatorStackParamList, MainNavigatorStackParamList } from './types';
import MainStack from './MainStack';
import AuthenticationStack from './AuthenticationStack';
import { useUserSession } from '@/store/features/user/hooks';


type NativeStackNavigatorParamList = {
    AuthenticationNavigator: NavigatorScreenParams<AuthNavigatorStackParamList>;
};

const Tab = createBottomTabNavigator<BottomNavigatorRootStackParamList>()
const Stack = createNativeStackNavigator<NativeStackNavigatorParamList>()

type BottomNavigatorRootStackParamList = {
    MainNavigator: NavigatorScreenParams<MainNavigatorStackParamList>;

}
const RootNavigator = () => {
    const userSession = useUserSession()


    console.log('process.env.EXPO_PUBLIC_API_URL : ', process.env.EXPO_PUBLIC_API_URL);
    

    if (userSession) return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="MainNavigator" component={MainStack} />
            </Tab.Navigator>
        </NavigationContainer>
    )

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                name="AuthenticationNavigator" 
                component={AuthenticationStack}
                options={{ headerShown: false }}
                 />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigator

