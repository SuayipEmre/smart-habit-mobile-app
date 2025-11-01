import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HabitsNavigatorStackParamList, MainNavigatorStackParamList } from './types'
import HabitsScreen from '@/screens/HabitsScreen'
import CreateHabitScreen from '@/screens/CreateHabitScreen'
import {  Ionicons } from '@expo/vector-icons'

const Stack = createNativeStackNavigator<HabitsNavigatorStackParamList>()



const HabitsStack = () => {


    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HabitsScreen"
                component={HabitsScreen}
                options={{
                    headerTitle: 'Your Habits'
                }}
            />
            <Stack.Screen
                name="CreateHabitScreen"
                component={CreateHabitScreen}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <Ionicons
                            name="arrow-back"
                            size={24}
                            color="black"
                            onPress={() => navigation.goBack()} 
                        />
                    ),
                    headerTitle: "Create a new habit",
                })}
            />
        </Stack.Navigator>
    )
}

export default HabitsStack
