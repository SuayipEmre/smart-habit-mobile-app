import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useGetUserProgressStatQuery, useGetUserStreakStatQuery } from '@/services/StatsService'
import { useUserSession } from '@/store/features/user/hooks'
import AntDesign from '@expo/vector-icons/AntDesign';
import ProgressChart from '@/components/ProgressChart';
import { useGetHabitsOfTodaysQuery } from '@/services/HabitService';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import CenteredView from '@/components/layouts/CenteredView';
import { useCompleteHabit } from '@/hooks/useCompleteHabit';
const HomeScreen = () => {
  const {
    data: streakData,
    isLoading: streakLoading,
    isError: streakIsError,
    error: streakError
  } = useGetUserStreakStatQuery({})

  const {
    data: progressData,
    isLoading: progressLoading,
    isError: progressIsError,
    error: progressError
  } = useGetUserProgressStatQuery({})

  const {
    data: todayHabitData,
    isLoading: todayHabitLoading,
    isError: isTodayHabitError,
    error: todayHabitError
  } = useGetHabitsOfTodaysQuery({})

  
  const user = useUserSession()
  const{completeHabit} = useCompleteHabit()


  const renderStreakContent = () => {
    if (streakLoading) return <ActivityIndicator />
    else if (streakIsError) return <Text>An error occured</Text>
    return (
      <View className='flex flex-col p-5 gap-2'>
        <AntDesign name="fire" size={42} color="#F25D07" />
        <View className='gap-1' >
          <Text className='font-bold text-large'>{streakData?.data?.bestStreak ?? 0}</Text>
          <Text className='text-sm'>Streak Steps</Text>
        </View>
      </View>
    )
  }

  const renderProgressContent = () => {
    if (progressLoading) return <ActivityIndicator />
    else if (progressIsError) return <Text>An error occured</Text>
    return <ProgressChart
      data={progressData?.data?.progress || []}
      isError={progressIsError}
      isLoading={progressLoading}
    />
  }

  type todayHabitData = {
    _id: string,
    title: string,
    description: string,
    frequency: string,
    streak: number,
    isCompletedToday:boolean
  }
  
  const renderHabitsOfTodayContent = () => {
    if (todayHabitLoading) return <ActivityIndicator />
    else if (todayHabitError) return <Text>An error occured</Text>
    const data: todayHabitData[] = todayHabitData.data.habits
    return (
      <>
        {
          data?.map(item => (
            <View
              key={item?._id}
              className="flex-row justify-between items-center bg-[#D0D7F9] rounded-lg shadow-sm px-4 py-3 mb-3">
              <View>
                <Text className="text-base font-semibold text-gray-900">{item.title}</Text>
                <Text className="text-sm text-gray-500">{item.frequency} • streak {item.streak}</Text>
              </View>
              <TouchableOpacity 
              disabled={item.isCompletedToday}
              className="px-4 py-2 bg-indigo-500 rounded-xl"
              onPress={() => completeHabit(item._id)}
              >
                <Text className="text-sm font-semibold text-white">Complete</Text>
              </TouchableOpacity>
            </View>

          ))
        }
      </>
    )
  }
  return (
    <SafeAreaView className='flex-1 bg-white' edges={['top']}>

      <ScrollView className='flex-1 bg-white'>
        <CenteredView className='gap-5 mt-5'>

          <View className='bg-[#63C271] opacity-90 rounded-xl p-5 gap-2'>
            <Text className='font-bold text-xl'>Hello, {user?.name}</Text>
            <Text className='font-semibold text-base'>Stay focused on your new habits today!</Text>
          </View>


          <View className='bg-[#F25D0780] flex-row items-center rounded-xl '>
            {renderStreakContent()}
            <Text className='font-bold text-2xl ml-5'>Keep up your streak!</Text>
          </View>


          {renderProgressContent()}


          <View className='gap-2'>

            <View className='flex flex-row items-center gap-2'>
              <MaterialIcons name="calendar-today" size={20} color="black" />
              <Text className='text-lg font-semibold  text-gray-900'>Today's habits</Text>
            </View>

            <View>
              {renderHabitsOfTodayContent()}
            </View>
          </View>


          </CenteredView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})