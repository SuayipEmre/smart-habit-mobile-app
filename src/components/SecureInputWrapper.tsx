import React from 'react'
import { View } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

type Props = {
  isSecureText: boolean
  setIsSecureText: (value: boolean) => void
  children: React.ReactNode
}

const SecureInputWrapper: React.FC<Props> = ({ isSecureText, setIsSecureText, children }) => {
  return (
    <View className="w-full items-center">
      {/* Göz ikonu */}
      {isSecureText ? (
        <MaterialCommunityIcons
          name="eye-outline"
          size={24}
          color="black"
          className="absolute right-8 top-2 z-10"
          onPress={() => setIsSecureText(!isSecureText)}
        />
      ) : (
        <MaterialCommunityIcons
          name="eye-off"
          size={24}
          color="black"
          className="absolute right-8 top-2 z-10"
          onPress={() => setIsSecureText(!isSecureText)}
        />
      )}

    
      {children}
    </View>
  )
}

export default SecureInputWrapper
