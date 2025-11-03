import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HabitsNavigatorStackParamList } from './types'
import HabitsScreen from '@/screens/HabitsScreen'
import CreateHabitScreen from '@/screens/CreateHabitScreen'
import { Ionicons } from '@expo/vector-icons'
import HabitDetail from '@/screens/HabitDetailScreen'
import HabitDetailScreen from '@/screens/HabitDetailScreen'

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

            <Stack.Screen
                name='HabitDetailScreen'
                component={HabitDetailScreen}
            />
        </Stack.Navigator>
    )
}

export default HabitsStack
