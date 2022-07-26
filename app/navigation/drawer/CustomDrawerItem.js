import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { COLORS, SIZES } from '../../constants/theme'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const CustomDrawerItem = ({ label, icon, isFocused, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        container,
        isFocused ? { backgroundColor: COLORS.transparentBlack1 } : null,
      ]}
      onPress={onPress}
    >
      <MaterialCommunityIcons name={icon} size={25} color="black" />
      <Text style={itemLabel}>{label}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 40,
    marginBottom: SIZES.base,
    alignItems: 'center',
    paddingLeft: SIZES.radius,
    borderRadius: SIZES.base,
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 15,
    color: COLORS.black,
  },
})
const { container, itemLabel } = styles

export default CustomDrawerItem
