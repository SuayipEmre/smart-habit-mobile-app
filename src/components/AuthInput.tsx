import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'


type Props = {
    placeholder?: string;
    secureTextEntry?: boolean;
    value?: string;
    onChangeText?: (text: string) => void;
}
const AuthInput: React.FC<Props> = ({
    onChangeText,
    placeholder,
    secureTextEntry,
    value }) => {
    return (
        <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            autoCapitalize='none'
            autoCorrect={false}
            selectionColor={'#8F00FF'}
            className='w-[90%] h-12 border border-[#ccc] rounded-lg text-xl px-4 py-2'
        />
    )
}

export default AuthInput

const styles = StyleSheet.create({

})