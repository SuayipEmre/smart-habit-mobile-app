import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useCompleteHabitMutation, useGetUserHabitsQuery } from '@/services/HabitService'
import HabitCard from '@/components/HabitCard'
import { AntDesign } from '@expo/vector-icons'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { HabitsNavigatorStackParamList } from '@/navigation/types'



type habits = {
    _id: string,
    title: string,
    description: string,
    frequency: string,
    user: string,
    streak: number,
    completedDates: [] | string[],
    reminderTime: string,
    createdAt: string,
    updatedAt: string
}
const HabitsScreen = () => {
    const { data, isLoading, isError } = useGetUserHabitsQuery({})

    console.log('HABITS : ', data);
    
    const navigation = useNavigation<NavigationProp<HabitsNavigatorStackParamList>>()

    const [sendCompleteHabitRequest, {
        isError: completeHabitError,
        isLoading: completeHabitLoading,
        data: completeHabitData,
        error
    }] = useCompleteHabitMutation()

    
    const completeHabits = async (habitId: string) => {
        try {
          const res = await sendCompleteHabitRequest(habitId).unwrap();
      
          Alert.alert("SmartHabit", "The habit was successfully completed");
        } catch (err: any) {
          const message = err?.data?.message || "Something went wrong";
          Alert.alert("SmartHabit", message);
        }
      };


    const renderHabits = () => {
        if (isLoading) return <ActivityIndicator />
        else if (isError) return <Text>An error occured</Text>
        return (
            <FlatList
                data={data?.data?.habits}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <HabitCard
                        {...item}
                        onComplete={completeHabits}
                        navigation={navigation}
                    />
                )}
                showsVerticalScrollIndicator={false}
                style={{ width: '90%', alignSelf: 'center' }}
            />
        )
    }




    return (
        <View className='flex flex-1 bg-white'>
            {renderHabits()}

            <TouchableOpacity
                onPress={() => navigation.navigate('CreateHabitScreen')}
                className='absolute right-5 bottom-10 z-50'>
                <AntDesign name="plus-circle" size={40} color="black" />
            </TouchableOpacity>
        </View>
    )
}

export default HabitsScreen

const styles = StyleSheet.create({})