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
import SecureInputWrapper from '@/components/SecureInputWrapper'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { AuthNavigatorStackParamList } from '@/navigation/types'

const LoginScreen = () => {
    const placeholderEmail = "Email"
    const placeholderPassword = "Password"

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSecureText, setIsSecureText] = useState(true)

    const navigation = useNavigation<NavigationProp<AuthNavigatorStackParamList>>()

    const [sendLoginRequest, { isError, isLoading }] = useSendSigninRequestMutation()

    const handleLogin = async () => {
        const responseData  = await sendLoginRequest({ email, password })
        if (responseData.error) {
            Alert.alert('Login Failed', 'Please check your credentials and try again.')
         }
        else {
            const userValues = {
                ...responseData.data.data.user,
                accessToken : responseData.data.data.accessToken,
                refreshToken :responseData.data.data.refreshToken
            } as UserSessionType
            setUserSession(userValues)
            await saveUserSessionToStorage(userValues)
        }



    }

    
    return (
        <SafeAreaView className='flex flex-1 '>
            <View className='w-full h-full items-center gap-10  py-2'>
                <WelcomeHeader />


                <TouchableOpacity 
                className='w-[90%] items-center justify-center flex-row gap-2'
                onPress={() => navigation.navigate('SignupScreen')}
                >
                    <Text className='font-bold text-xl'>Don't have an account yet?</Text>
                    <Text className='text-[#0070FF] font-bold text-xl border-b-[.5px]'>Signup!</Text>
                </TouchableOpacity>

                <View className='w-[90%] items-center gap-5'>
                    <AuthInput
                        onChangeText={setEmail}
                        placeholder={placeholderEmail}
                        value={email}
                        secureTextEntry={false}
                    />

                   {/*  <View className='w-full items-center'>
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
                    </View> */}
                    <SecureInputWrapper isSecureText={isSecureText} setIsSecureText={setIsSecureText}>
                    <AuthInput
                            value={password}
                            onChangeText={setPassword}
                            placeholder={placeholderPassword}
                            secureTextEntry={isSecureText}
                        />
                    </SecureInputWrapper>

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