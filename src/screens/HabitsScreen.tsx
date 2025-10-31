import { ActivityIndicator, Alert, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useCompleteHabitMutation, useGetUserHabitsQuery } from '@/services/HabitService'
import HabitCard from '@/components/HabitCard'


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
    const { data, isLoading, isError, error } = useGetUserHabitsQuery({})

    console.log('data : ', data);
    console.log('isLoading', isLoading);
    console.log('isError:', isError);
    console.log('error : ', error);

    const [sendCompleteHabitRequest, {
        isError: completeHabitError,
        isLoading: completeHabitLoading,
        data: completeHabitData
    }] = useCompleteHabitMutation()

    const completeHabits = async (habitId: string) => {
        try {
            const {data} = await sendCompleteHabitRequest(
                habitId
            )
            console.log('complete data : ', data);

            if(data.status == 'success'){
                Alert.alert('SmartHabit', 'The habit was succesfully completed') 
            }else{
                Alert.alert('SmartHabit', 'An error occured while completing the habit')
            }
            
            
        } catch (error) {
            console.log('error : ', error);
            Alert.alert('SmartHabit', 'An error occured while completing the habit')
            
        }
    }


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
                        isCompletedToday={false}
                        onComplete={completeHabits}
                    />
                )}
            />
        )
    }




    return (
        <View className='flex flex-1 bg-white'>
            {renderHabits()}
        </View>
    )
}

export default HabitsScreen

const styles = StyleSheet.create({})