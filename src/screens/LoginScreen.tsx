import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import WelcomeHeader from '@/components/WelcomeHeader'
import AuthInput from '@/components/AuthInput'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSendSigninRequestMutation } from '@/services/AuthService'
import { setUserSession } from '@/store/features/user/actions'
import { UserSessionType } from '@/types/UserSessionType'
import { saveUserSessionToStorage } from '@/utils/asyncStorage/userSessions'

const LoginScreen = () => {
    const placeholderEmail = "Email"
    const placeholderPassword = "Password"

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSecureText, setIsSecureText] = useState(true)

    const [sendLoginRequest, { isError, isLoading }] = useSendSigninRequestMutation()

    const handleLogin = async () => {
        console.log('email : ', email);
        console.log('password : ', password);


        const data  = await sendLoginRequest({ email, password })
        console.log('Login response data:', data);
       

        if (data.error) {
            console.log('Login error:', data.error);
            Alert.alert('Login Failed', 'Please check your credentials and try again.')
         }
        else {
            const userValues = {
                ...data.data.user,
                token : data.data.token
            } as UserSessionType
            setUserSession(userValues)
            await saveUserSessionToStorage(userValues)
        }



    }
    return (
        <SafeAreaView className='flex flex-1 '>
            <View className='w-full h-full items-center gap-10  py-2'>
                <WelcomeHeader />


                <View className='w-[90%] items-center justify-center flex-row gap-2'>
                    <Text className='font-bold text-xl'>Don't have an account yet?</Text>
                    <Text className='text-[#0070FF] font-bold text-xl border-b-[.5px]'>Signup!</Text>
                </View>

                <View className='w-[90%] items-center gap-5'>
                    <AuthInput
                        onChangeText={setEmail}
                        placeholder={placeholderEmail}
                        value={email}
                        secureTextEntry={false}
                    />

                    <View className='w-full items-center'>
                        {
                            isSecureText ? (
                                <MaterialCommunityIcons
                                    name="eye-outline"
                                    size={24} color="black"
                                    className='absolute right-8 top-2 z-10'
                                    onPress={() => setIsSecureText(!isSecureText)}
                                />
                            ) : <MaterialCommunityIcons
                                name="eye-off"
                                size={24} color="black"
                                className='absolute right-8 top-2 z-10'
                                onPress={() => setIsSecureText(!isSecureText)}
                            />
                        }

                        <AuthInput
                            value={password}
                            onChangeText={setPassword}
                            placeholder={placeholderPassword}
                            secureTextEntry={isSecureText}
                        />
                    </View>

                    <View className='w-[90%]  gap-2'>
                        <TouchableOpacity
                            className='bg-[#C6CEF8] items-center justify-center px-4 py-4 rounded-2xl'
                            onPress={handleLogin}
                        >
                            <Text className='font-bold text-lg text-black '>Signin</Text>
                        </TouchableOpacity>


                    </View>
                </View>


            </View>


        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})