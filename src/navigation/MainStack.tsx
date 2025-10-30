import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MainNavigatorStackParamList } from './types'
import HomeScreen from '@/screens/HomeScreen'
const Stack = createNativeStackNavigator<MainNavigatorStackParamList>()

const MainStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default MainStack

const styles = StyleSheet.create({})