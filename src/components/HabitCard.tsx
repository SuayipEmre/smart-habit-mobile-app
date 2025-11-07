import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated'
import Animated from 'react-native-reanimated'
import * as Haptics from 'expo-haptics'
import { Entypo } from '@expo/vector-icons'
import { NavigationProp } from '@react-navigation/native'
import { HabitsNavigatorStackParamList } from '@/navigation/types'


type HabitType = {
  _id: string
  title: string
  description?: string
  frequency: string
  user: string
  streak: number
  completedDates: string[]
  reminderTime: string
  isCompletedToday?: boolean
  onComplete?: (id: string) => void,
  createdAt: string,
  updatedAt: string,
  navigation : NavigationProp<HabitsNavigatorStackParamList>
}

const HabitCard: React.FC<HabitType> = ({
  _id,
  title,
  description,
  frequency,
  streak,
  reminderTime,
  isCompletedToday,
  onComplete,
  createdAt,
  updatedAt,
  navigation
}) => {

  const habit = {
    _id,
    title,
    description,
    frequency,
    streak,
    reminderTime,
    isCompletedToday,
    createdAt,
    updatedAt
  }

  
  // animasyon state
  const progress = useSharedValue(isCompletedToday ? 1 : 0)

  // renk geçişi animasyonu (tamamlanma durumu)
  const cardStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ['#ffffff', '#f3f4f6'] // 
    ),
  }))

  const handleComplete = () => {
    if (isCompletedToday) return
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    progress.value = withTiming(1, { duration: 500 })
    onComplete?.(_id)
  }

  console.log('is completed habit on card : ', isCompletedToday);
  


  const handleHabitDetail = () => {
  

    navigation.navigate('HabitDetailScreen', {habit})
  }
  return (
    <Animated.View
      className="rounded-2xl shadow-sm mb-3 p-4 dark:bg-zinc-900"
      style={cardStyle}
    >
      <TouchableOpacity onPress={handleHabitDetail}>
        <View className='flex flex-row justify-between'>
          {/* Başlık ve açıklama */}
          <Text className="text-base font-semibold text-gray-900 dark:text-gray-100">
            {
              title.length > 25 ? title.slice(0, 25) + ' ...' : title
            }
          </Text>

        </View>
        {description ? (
          <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1" numberOfLines={2}>
            {description.length > 45 ? description.slice(0, 45) : description}
          </Text>
        ) : null}
      </TouchableOpacity>

      {/* Bilgi satırı */}
      <View className="flex-row justify-between items-center mt-3">
        <View className="flex-row space-x-2">
          <View className="px-2 py-1 rounded-full bg-blue-100">
            <Text className="text-[11px] text-blue-600 font-medium">{frequency}</Text>
          </View>
          {reminderTime && (
            <View className="px-2 py-1 rounded-full bg-amber-100">
              <Text className="text-[11px] text-amber-600 font-medium">⏰ {reminderTime}</Text>
            </View>
          )}
          <View className="px-2 py-1 rounded-full bg-green-100">
            <Text className="text-[11px] text-green-600 font-medium">🔥 {streak}</Text>
          </View>
        </View>

        {/* Complete butonu */}
        <TouchableOpacity
          disabled={isCompletedToday}
          onPress={handleComplete}
          className={`px-4 py-2 rounded-xl ${isCompletedToday
            ? 'bg-gray-200'
            : 'bg-indigo-500 active:bg-indigo-600'
            }`}
        >
          <Text
            className={`text-sm font-semibold ${isCompletedToday ? 'text-gray-500' : 'text-white'
              }`}
          >
            {isCompletedToday ? 'Completed' : 'Complete'}
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
}

export default HabitCard
