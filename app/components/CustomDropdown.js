import React from 'react'
import { Platform, View, Text, StyleSheet } from 'react-native'
import { COLORS, SIZES } from '../constants/theme'

import DropDownPicker from 'react-native-dropdown-picker'

const CustomDropdown = ({
  open,
  setOpen,
  label,
  value,
  setValue,
  onChange,
  disabled,
  items,
  formFieldID,
  searchPlaceholder,
  formObject,
  setFormObject,
  errors,
  setErrors,
}) => {
  const handleSelectItem = (item) => {
    setFormObject({
      ...formObject,
      [formFieldID]: item.id,
    })
    if (
      formFieldID == 'patient_id' ||
      formFieldID == 'service_code_id' ||
      formFieldID == 'location_id'
    ) {
      setErrors({
        ...errors,
        [formFieldID]: false,
      })
    }
  }

  return (
    <View style={styles.inputView}>
      <Text style={styles.dropdownLabel}>{label}</Text>
      <DropDownPicker
        open={open}
        setOpen={setOpen}
        placeholder={`Select ${label}`}
        value={value}
        setValue={setValue}
        items={items}
        onSelectItem={(item) => handleSelectItem(item)}
        searchable={true}
        style={styles.dropdownContainer}
        labelStyle={{ fontWeight: 'bold' }}
        selectedItemLabelStyle={{ fontWeight: 'bold' }}
        disabled={disabled}
        disabledStyle={{
          opacity: 0.5,
        }}
        searchPlaceholder={searchPlaceholder}
        searchContainerStyle={{
          borderBottomColor: COLORS.darkBlue,
          paddingBottom: 0,
        }}
        searchTextInputStyle={{ borderWidth: 0 }}
        listMode="MODAL"
        modalProps={{ animationType: 'slide', statusBarTranslucent: true }}
        modalContentContainerStyle={{
          backgroundColor: COLORS.secondary,
          paddingTop: 40,
        }}
      />
    </View>
  )
}

export default CustomDropdown

const styles = StyleSheet.create({
  dropdownContainer: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.darkGray,
    borderWidth: 0.8,
    borderRadius: 3,
    height: 58,
  },
  dropdownLabel: {
    fontSize: 12,
    fontWeight: '300',
    color: COLORS.darkGray,
    backgroundColor: COLORS.secondary,
    top: 7,
    left: 10,
    zIndex: 9999999,
    alignSelf: 'flex-start',
    borderRadius: 7,
    paddingHorizontal: 3,
  },

  inputView: {
    flex: 1,
    width: '85%',
    marginBottom: 20,
    marginTop: -5,
    paddingLeft: 5,
    // flexDirection: "row",
    justifyContent: 'flex-start',
  },
})
