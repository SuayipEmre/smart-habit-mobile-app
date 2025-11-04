import { StyleSheet, Text, View, TouchableOpacity, Alert, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HabitsNavigatorStackParamList } from '@/navigation/types'
import HabitInput from '@/components/HabitInput'
import { Dimensions } from 'react-native'
import SelectFrequency from '@/components/SelectFrequency'
import SelectReminderTime from '@/components/SelectReminderTime'
import { useDeleteHabitMutation, useUpdateHabitMutation } from '@/services/HabitService'
import { formatTime } from '@/utils/formatTime'
import { useHabitDescription, useHabitFrequency, useHabitReminderTime, useHabitShowPicker, useHabitTitle } from '@/store/features/habit/hooks'
import { setHabitDescription, setHabitFrequency, setHabitReminderTime, setHabitShowPicker, setHabitTitle } from '@/store/features/habit/actions'
import { frequencyType } from '@/types/frequencyType'
import CenteredView from '@/components/layouts/CenteredView'

type Props = NativeStackScreenProps<HabitsNavigatorStackParamList, 'HabitDetailScreen'>

const { height } = Dimensions.get('window')

const HabitDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { habit } = route.params

  const [updateHabit, { isLoading : updateIsLoading, isError : updateIsError }] = useUpdateHabitMutation()
  const [deleteHabit, { isLoading, isError }] = useDeleteHabitMutation()

  const title = useHabitTitle()
  const description = useHabitDescription()
  const frequency = useHabitFrequency()
  const reminderTime = useHabitReminderTime()
  const showPicker = useHabitShowPicker()

  useEffect(() => {
    setHabitDescription(habit.description || '')
    setHabitTitle(habit.title)
    setHabitFrequency(habit.frequency as frequencyType)
    setHabitReminderTime(habit.reminderTime || null)
  },[habit, route, navigation])
  
  const handleUpdate = async () => {
    if (!title.trim()) {
      return Alert.alert('Missing Title', 'Please enter a habit title.')
    }

    const formattedTime = reminderTime
    ? formatTime(new Date(reminderTime)) // ISO → Date
    : null;

    try {
      await updateHabit({
        title,
        description,
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

  const handleDeleteHabit = async() => {
    try {
      await deleteHabit(habit._id).unwrap()
      Alert.alert('Smart Habit', 'Succesfully deleted the habit')
      navigation.goBack()
    } catch (error) {
      Alert.alert('Smart Habit', 'An error occured while deleting the habit.')
    }
  }



  const showAlert = () => (
    Alert.alert(
      'Smart Habit',
      'The Habit will be deleted!',
      [
        {
          text: 'changed my mind',
          style: 'default',
          isPreferred: true
        },

        {
          text: 'Delete the habit ',
          onPress: async() => await handleDeleteHabit(),
          style: 'destructive',
        },

      ],


    )
  )

  



  const handleDeleteChanges = () => {
    setHabitTitle(habit.title)
    setHabitDescription(habit.description || '')
    setHabitFrequency(habit.frequency as frequencyType)
    setHabitReminderTime(null)
  }
  return (
    <ScrollView className="flex flex-1 bg-white px-5 py-4">

      <CenteredView>
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
          setValue={setHabitTitle}
          placeholder="Title"
          height={height}
          title="Habit title"
          isMultiline={false}
        />

        {/* Description input */}
        <HabitInput
          value={description}
          setValue={setHabitDescription}
          placeholder="Description"
          height={height}
          title="Habit description"
          isMultiline={true}
        />


        <SelectFrequency
          frequency={frequency}
          setFrequency={setHabitFrequency}
        />

        <SelectReminderTime
          reminderTime={reminderTime}
          setReminderTime={setHabitReminderTime}
          setShowPicker={setHabitShowPicker}
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
          onPress={showAlert}
          className={`mt-6 py-3 rounded-xl ${false ? 'bg-gray-400' : 'bg-red-500 active:bg-indigo-600'
            }`}
        >
          <Text className="text-center text-white font-semibold">
            Delete The Habit
          </Text>
        </TouchableOpacity>
      </CenteredView>
    </ScrollView>
  )
}

export default HabitDetailScreen

const styles = StyleSheet.create({})
