import React from 'react'
import { View, StyleSheet } from 'react-native'
import { TextInput, TextInputMask } from 'react-native-paper'
import { COLORS } from '../constants/theme'

const CustomTextInput = (props) => {
  const { label, placeholder, value, keyboardType, onChangeText } = props
  return (
    <View style={styles.inputView}>
      <TextInput
        mode={'outlined'}
        style={styles.textField}
        activeOutlineColor={COLORS.blue}
        outlineColor={COLORS.blue1}
        placeholderTextColor={COLORS.blue1}
        label={label}
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  inputView: {
    flex: 1,
    width: '85%',
    marginBottom: 20,
    margin: 2,
    paddingLeft: 5,
    justifyContent: 'flex-start',
  },
  textField: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
})
export default CustomTextInput
