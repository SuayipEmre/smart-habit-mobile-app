import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HabitsNavigatorStackParamList, MainNavigatorStackParamList } from './types'
import HomeScreen from '@/screens/HomeScreen'
import HabitsScreen from '@/screens/HabitsScreen'

const Stack = createNativeStackNavigator<HabitsNavigatorStackParamList>()

const HabitsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HabitsScreen"
                component={HabitsScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default HabitsStack
