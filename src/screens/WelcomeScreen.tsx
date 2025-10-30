import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LogoIcon from '@/assets/LogoIcon'
import AuthButton from '@/components/AuthButton'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { AuthNavigatorStackParamList } from '@/navigation/types'

const WelcomeScreen = () => {

  const navigation = useNavigation<NavigationProp<AuthNavigatorStackParamList>>()
  const handleNavigate = (process : string) => {
    if(process === 'login'){
      navigation.navigate('LoginScreen')
      return
    }

    navigation.navigate('SignupScreen')
  }
  return (
    <SafeAreaView className='flex flex-1 bg-white '>
      <View className='w-full h-full pt-2 flex items-center justify-between'>

        <View className='flex flex-row items-center gap-2'>
          <LogoIcon />
          <Text className='font-bold text-2xl'>Welcome to SmartHabit</Text>
        </View>


        <Image
          source={require('../../assets/reading.png')}
          width={200}
          height={200}
        />

        <View className='px-4 gap-2'>
          <Text className='font-bold'>Small habits, create big changes with Hebify</Text>
          <Text className='font-bold'>Build a positive routine every day, achieving your life goals in a consistent and enjoyable way.</Text>
        </View>


        <View className='w-full items-center gap-2'>

          <AuthButton
            bgColor='#72A0C1'
            textColor='white'
            text='Get Started'
            onPress={() => handleNavigate('signup')}
          />

          <AuthButton
            bgColor='black'
            textColor='white'
            text='Already have an account?'
            onPress={() => handleNavigate('login')}
          />
        </View>

        <View />

      </View>
    </SafeAreaView>
  )
}

export default WelcomeScreen

