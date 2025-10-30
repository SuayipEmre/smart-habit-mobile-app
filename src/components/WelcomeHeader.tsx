import {  Text, View } from 'react-native'
import React from 'react'
import LogoIcon from '@/assets/LogoIcon'

const WelcomeHeader = () => {
  return (
    <View className='flex flex-row items-center gap-2'>
    <LogoIcon />
    <Text className='font-bold text-2xl'>Welcome to SmartHabit</Text>
  </View>

  )
}

export default WelcomeHeader

