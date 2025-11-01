import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

type Props = {
    value: string,
    setValue: (value: string) => void,
    placeholder: string,
    height : number,
    title : string
}
const HabitInput: React.FC<Props> = ({ setValue, value, placeholder, height, title }) => {
    return (
        <View className={`gap-5  py-5 flex items-center justify-center rounded-xl`}
            style={{ minHeight: height * 0.1 }}
        >
            <Text className='w-[90%] text-[#F25D07]'>{title}</Text>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                className='w-[90%]  border px-2 py-4 rounded-md'
            />
        </View>
    )
}

export default HabitInput
