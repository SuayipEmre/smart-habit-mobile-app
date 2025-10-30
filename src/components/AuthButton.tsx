import {  Text, TouchableOpacity } from 'react-native'
import React from 'react'

type Props = {
    onPress : () => void
    textColor : string,
    bgColor : string,
    text : string
}
const AuthButton: React.FC<Props> = ({ bgColor, onPress, textColor, text }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        className="w-[90%] py-6 items-center justify-center rounded-[20px]"
        style={{ backgroundColor: bgColor }}
        activeOpacity={.8}
      >
        <Text style={{ color: textColor }} className="font-bold text-xl">
          {text}
        </Text>
      </TouchableOpacity>
    )
  }
export default AuthButton

