
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { AuthNavigatorStackParamList, HabitsNavigatorStackParamList, MainNavigatorStackParamList, ProfileNavigatorStackParamList } from './types';
import MainStack from './MainStack';
import AuthenticationStack from './AuthenticationStack';
import { useUserSession } from '@/store/features/user/hooks';
import Entypo from 'react-native-vector-icons/Entypo';
import ProfileStack from './ProfileStack';
import Feather from '@expo/vector-icons/Feather';
import { setUserSession } from '@/store/features/user/actions';
import { getUserSessionFromStorage } from '@/utils/asyncStorage/userSessions';
import { UserSessionType } from '@/types/UserSessionType';
import AntDesign from '@expo/vector-icons/AntDesign';
import HabitsStack from './HabitsStack';

type NativeStackNavigatorParamList = {
    AuthenticationNavigator: NavigatorScreenParams<AuthNavigatorStackParamList>;
};


const Tab = createBottomTabNavigator<BottomNavigatorRootStackParamList>()
const Stack = createNativeStackNavigator<NativeStackNavigatorParamList>()

type BottomNavigatorRootStackParamList = {
    MainNavigator: NavigatorScreenParams<MainNavigatorStackParamList>;
    HabitsNavigator : NavigatorScreenParams<HabitsNavigatorStackParamList>
    ProfileNavigator : NavigatorScreenParams<ProfileNavigatorStackParamList>
}
const RootNavigator = () => {
    const userSession = useUserSession()


    useEffect(() => {
      const getUserSession = async () => {
        const userSession = await getUserSessionFromStorage()
        setUserSession(userSession as UserSessionType)
      }

        getUserSession()
    },[])

    if (userSession) return (
        <NavigationContainer>
            <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor : '#00000',
                tabBarInactiveTintColor : '#808080',
            }}

            
            >
                <Tab.Screen
                    name="MainNavigator"
                    component={MainStack}
                    options={{
                        tabBarLabel : '',
                        headerShown:false,
                        tabBarIcon: ({ focused, color }) => (
                            <Entypo name="home" color={color} size={25} />
                        ),
                    }}
                />

                <Tab.Screen 
                name='HabitsNavigator'
                component={HabitsStack}
                options={{
                    tabBarLabel : '',
                    tabBarIcon : ({focused, color}) => (
                        <AntDesign name="unordered-list" size={24} color={color} />
                    ),
                    headerTitle : 'Your Habits',
                    headerShown:false
                }}
                />

                <Tab.Screen
                name='ProfileNavigator'
                component={ProfileStack}
                options={{
                    tabBarLabel : '',
                    tabBarIcon: ({ focused, color}) => (
                        <Feather name="user" size={24} color={color} />
                    ),
                }}
                />
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

