import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { clearUserSessionFromStorage } from '@/utils/asyncStorage/userSessions'

const ProfileScreen = () => {
    const handleSignOut = async () => {
     const data =    await clearUserSessionFromStorage()
    }
    return (
        <View>
            <Text>ProfileScreen</Text>

            <TouchableOpacity onPress={handleSignOut}>
                <Text>Signout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})