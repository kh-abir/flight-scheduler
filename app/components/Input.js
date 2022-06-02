import React from 'react'
import { View, Button, StyleSheet, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useController } from 'react-hook-form'
import { COLORS } from '../constants/theme';

const Input = ({ name, control }) => {
  const { field } = useController({
    control,
    name
  })

  return (
      <TextInput
        style={{flex: 1, height: 40}}
        mode={'outlined'}
        label={name}
        value={field.value}
        onChangeText={field.onChange}
        placeholder={name}
        activeOutlineColor={COLORS.blue}
        outlineColor={COLORS.lightGray1}
    />
  )
}

export default Input;
