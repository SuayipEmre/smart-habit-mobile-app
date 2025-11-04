import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import WelcomeHeader from '@/components/WelcomeHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import AuthInput from '@/components/AuthInput'
import SecureInputWrapper from '@/components/SecureInputWrapper'
import { useSendSignupRequestMutation } from '@/services/AuthService'
import { setUserSession } from '@/store/features/user/actions'
import { saveUserSessionToStorage } from '@/utils/asyncStorage/userSessions'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { AuthNavigatorStackParamList } from '@/navigation/types'
import CenteredView from '@/components/layouts/CenteredView'

const SignupScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSecureText, setIsSecureText] = useState(true)
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')

    const navigation = useNavigation<NavigationProp<AuthNavigatorStackParamList>>()
    const [sendSignupRequest, { isError, isLoading }] = useSendSignupRequestMutation()

    const handleSignup = async () => {
        const { data } = await sendSignupRequest({ name, username, email, password })

        if (data.error) {
            Alert.alert('Signup Failed', 'Please check your credentials and try again.')
        }
        else {
            const userValues = {
                ...data.data.user,
                accessToken: data.data.accessToken,
                refreshToken : data.data.refreshToken
            }
            setUserSession(userValues)
            Alert.alert('Signup Successful', 'Your account has been created successfully.')
            await saveUserSessionToStorage(userValues)
        }

    }


    return (
        <SafeAreaView className='flex flex-1 bg-white'>

            <CenteredView className='items-center gap-5'>
                <WelcomeHeader />

                <TouchableOpacity
                    className='w-[90%] items-center justify-center flex-row gap-2'
                    onPress={() => navigation.navigate('LoginScreen')}
                >
                    <Text className='font-bold text-xl'>Already have an account </Text>
                    <Text className='text-[#0070FF] font-bold text-xl border-b-[.5px]'>Signin!</Text>
                </TouchableOpacity>

                <View className='w-full items-center gap-5'>
                    <AuthInput
                        placeholder='Name'
                        value={name}
                        onChangeText={setName}
                        secureTextEntry={false}
                    />
                    <AuthInput
                        placeholder='Username'
                        value={username}
                        onChangeText={setUsername}
                        secureTextEntry={false}
                    />
                    <AuthInput
                        placeholder='Email'
                        value={email}
                        onChangeText={setEmail}
                        secureTextEntry={false}
                    />

                    <SecureInputWrapper
                        isSecureText={isSecureText}
                        setIsSecureText={setIsSecureText}
                    >
                        <AuthInput
                            placeholder='Password'
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={isSecureText}
                        />
                    </SecureInputWrapper>

                    <TouchableOpacity
                        className='w-[90%] bg-[#C6CEF8] items-center justify-center px-4 py-4 rounded-2xl'
                        onPress={handleSignup}
                    >
                        <Text className='font-bold text-lg text-black '>Signup</Text>
                    </TouchableOpacity>

                </View>
            </CenteredView>

        </SafeAreaView>
    )
}

export default SignupScreen

const styles = StyleSheet.create({})