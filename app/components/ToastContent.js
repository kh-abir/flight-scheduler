import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { COLORS } from '../constants/theme'

const ToastContent = ({ toast: { type, message, onHide } }) => {
  return (
    <View style={[styles.container, styles[type]]}>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={onHide}>
        <MaterialCommunityIcons name="window-close" size={27} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderLeftColor: COLORS.blue2,
    minHeight: 45,
    maxWidth: '95%',
    marginBottom: 8,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    shadowColor: '#141414',
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 20,
  },
  message: { marginLeft: 5, marginRight: 10 },
  custom_success: {
    backgroundColor: COLORS.lightGreen,
    borderLeftColor: COLORS.green,
    borderRightColor: COLORS.green,
  },
  custom_danger: {
    backgroundColor: COLORS.lightRed,
    borderLeftColor: COLORS.red,
    borderRightColor: COLORS.red,
  },
  custom_warning: {
    backgroundColor: COLORS.lightYellow,
    borderLeftColor: COLORS.yellow,
    borderRightColor: COLORS.yellow,
  },
})

export default ToastContent
