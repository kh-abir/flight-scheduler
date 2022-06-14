import React from 'react'
import { Platform, View, Text, StyleSheet } from 'react-native'
import { COLORS, SIZES } from '../constants/theme'
import { TextInput } from 'react-native-paper'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

import moment from 'moment'

const CustomDatepicker = ({
  label,
  mode,
  placeholderText,
  iconName,
  value,
  onPress,
  show,
  onChange,
  onConfirm,
  onCancel,
}) => {
  const selectedValue = value
    ? mode == 'date'
      ? moment(Date.parse(value)).format('MMM D, YYYY')
      : moment(value).format('h:mm a')
    : null

  return (
    <View style={styles.inputView}>
      <TextInput
        style={styles.textInput}
        editable={false}
        label={label}
        placeholder={placeholderText}
        mode={'outlined'}
        value={selectedValue}
        right={
          <TextInput.Icon
            onPress={onPress}
            name={iconName}
            size={30}
            color="black"
          />
        }
      />
      <DateTimePickerModal
        isVisible={show}
        date={new Date(value)}
        mode={mode}
        display={'spinner'}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </View>
  )
}

export default CustomDatepicker

const styles = StyleSheet.create({
  inputView: {
    flex: 1,
    width: '85%',
    marginBottom: 20,
    margin: 2,
    paddingLeft: 5,
    justifyContent: 'flex-start',
  },
  textInput: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
})
