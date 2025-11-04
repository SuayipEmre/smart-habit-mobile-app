import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { frequencyType } from '@/types/frequencyType'

const frequencyData = ["daily", "weekly", "monthly"]

type Props = {
    frequency : string,
    setFrequency : (frequency : frequencyType) => void
}
const SelectFrequency : React.FC<Props> = ({frequency, setFrequency}) => {
  return (
    <View className="w-full self-center mt-4">
    <Text className="font-semibold mb-2 text-[#F25D07]">Habit Frequency</Text>

    <View className="flex flex-row gap-5 flex-wrap">
        {frequencyData.map((item) => (
            <TouchableOpacity
                key={item}
                onPress={() => setFrequency(item as frequencyType)}
                className={`w-[25%] py-2 rounded-md mt-5 items-center justify-center ${frequency === item ? "bg-green-500" : "bg-green-100"
                    }`}
            >
                <Text
                    className={`${frequency === item ? "text-white" : "text-green-900"
                        } font-semibold capitalize`}
                >
                    {item}
                </Text>
            </TouchableOpacity>
        ))}
    </View>




</View>
  )
}

export default SelectFrequency
