import React from 'react'
import {View, Button, StyleSheet, Alert, Platform} from 'react-native';
import { TextInput } from 'react-native-paper';
import { useController } from 'react-hook-form'
import { COLORS } from '../constants/theme';

const SearchInput = ({ label, value, onChange, onPress }) => {
  return (
      <View
          style={styles.container}
      >
          <TextInput
              style={styles.input}
              mode={'outlined'}
              label={label}
              value={value}
              onChangeText={onChange}
              activeOutlineColor={COLORS.blue}
              outlineColor={COLORS.black}
              right={
                  <TextInput.Icon
                      onPress={onPress}
                      name={'account-search'}
                      size={30}
                      color={COLORS.black}
                  />
              }
          />
      </View>
  )
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
    },
    input: {
        backgroundColor: COLORS.secondary,
        height: 40,
        marginBottom: 5,
    }
});
export default SearchInput;
