import { StyleSheet, Text, View, TouchableOpacity, Alert, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HabitsNavigatorStackParamList } from '@/navigation/types'
import HabitInput from '@/components/HabitInput'
import { Dimensions } from 'react-native'
import LogoIcon from '@/assets/LogoIcon'
import SelectFrequency from '@/components/SelectFrequency'
import SelectReminderTime from '@/components/SelectReminderTime'
import { useUpdateHabitMutation } from '@/services/HabitService'
import { formatTime } from '@/utils/formatTime'

type Props = NativeStackScreenProps<HabitsNavigatorStackParamList, 'HabitDetailScreen'>

const { height } = Dimensions.get('window')

const HabitDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { habit } = route.params
  const [title, setTitle] = useState(habit.title)
  const [desc, setDesc] = useState(habit.description || '')
  const [frequency, setFrequency] = useState(habit.frequency)
  const [reminderTime, setReminderTime] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const [updateHabit, { isLoading, isError }] = useUpdateHabitMutation()

  const handleUpdate = async () => {
    if (!title.trim()) {
      return Alert.alert('Missing Title', 'Please enter a habit title.')
    }

    const formattedTime = formatTime(reminderTime)
    try {
      await updateHabit({
        title,
        description: desc,
        habitId: habit._id,
        frequency,
        remindertime: formattedTime 
      }).unwrap()
      Alert.alert('Success', 'Habit updated successfully ✅', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ])
    } catch (error) {
      console.log('Update failed:', error)
      Alert.alert('Error', 'Failed to update habit ❌')
    }
  }


  const handleDeleteChanges = () => {
    setTitle(habit.title)
    setDesc(habit.description || '')
    setFrequency(habit.frequency)
    setReminderTime(null)
  }
  return (
    <ScrollView className="flex flex-1 bg-white px-5 py-4">

      <View className='w-[90%] self-center'>
        <Image
          source={require('../../assets/reading.png')}
          width={200}
          height={200}
        />
        {/* Başlık */}
        <Text className="text-xl font-semibold text-gray-900 mb-3">Habit Details</Text>

        {/* Bilgiler */}
        <View >
          <Text className="text-gray-600 mb-1">Current Streak: 🔥 {habit.streak} days</Text>
          <Text className="text-gray-600 mb-1">
            Completed Today: {habit.isCompletedToday ? '✅ Yes' : '❌ No'}
          </Text>
          <Text className="text-gray-600 mb-1">Frequency: {habit.frequency}</Text>
          <Text>Reminder Time : {habit.reminderTime}</Text>
          <Text>{ }</Text>
        </View>

        {/* Title input */}
        <HabitInput
          value={title}
          setValue={setTitle}
          placeholder="Title"
          height={height}
          title="Habit title"
          isMultiline={false}
        />

        {/* Description input */}
        <HabitInput
          value={desc}
          setValue={setDesc}
          placeholder="Description"
          height={height}
          title="Habit description"
          isMultiline={true}
        />


        <SelectFrequency
          frequency={frequency}
          setFrequency={setFrequency}
        />

        <SelectReminderTime
          reminderTime={reminderTime}
          setReminderTime={setReminderTime}
          setShowPicker={setShowPicker}
          showPicker={showPicker}
        />

        {/* Save butonu */}
        <TouchableOpacity
          onPress={handleUpdate}
          className={`mt-6 py-3 rounded-xl ${false ? 'bg-gray-400' : 'bg-indigo-500 active:bg-indigo-600'
            }`}
        >
          <Text className="text-center text-white font-semibold">
            {false ? 'Saving...' : 'Save Changes'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDeleteChanges}
          className={`mt-6 py-3 rounded-xl ${false ? 'bg-gray-400' : 'bg-orange-500 active:bg-indigo-600'
            }`}
        >
          <Text className="text-center text-white font-semibold">
            Delete Changes
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
          onPress={handleUpdate}
          className={`mt-6 py-3 rounded-xl ${false ? 'bg-gray-400' : 'bg-red-500 active:bg-indigo-600'
            }`}
        >
          <Text className="text-center text-white font-semibold">
            Delete The Habit
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default HabitDetailScreen

const styles = StyleSheet.create({})
