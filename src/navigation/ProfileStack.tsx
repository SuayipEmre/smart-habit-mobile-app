import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ProfileNavigatorStackParamList } from './types'
import ProfileScreen from '@/screens/ProfileScreen'
const Stack = createNativeStackNavigator<ProfileNavigatorStackParamList>()

const ProfileStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default ProfileStack
