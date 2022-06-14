import React from 'react'
import { TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
const BackButton = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'flex-start',
      }}
      onPress={() => navigation.navigate.goBack()}
    >
      <MaterialCommunityIcons
        name="keyboard-backspace"
        size={30}
        color="black"
      />
    </TouchableOpacity>
  )
}

export default BackButton
