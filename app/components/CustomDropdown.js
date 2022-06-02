import React from 'react'
import {
  Platform,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

import DropDownPicker from 'react-native-dropdown-picker';

const CustomDropdown = ({
  open,
  setOpen,
  label,
  value,
  setValue,
  onChange,
  items,
  formFieldID,
  searchPlaceholder,
  formObject,
  setFormObject,
}) => {
  const handleSelectItem = item => {
    setFormObject({
      ...formObject,
      [formFieldID]: item.id
    })
  }

  return (
    <View style={styles.inputView}>
      <Text style={styles.dropdownLabel}>{label}</Text>
      <DropDownPicker
        open={open}
        setOpen={setOpen}
        placeholder="Select an item"
        value={value}
        setValue={setValue}
        items={items}
        onSelectItem={item => handleSelectItem(item)}
        searchable={true}
        style={styles.dropdownContainer}
        labelStyle={{fontWeight: "bold"}}
        selectedItemLabelStyle={{fontWeight: "bold"}}
        searchPlaceholder={searchPlaceholder}
        searchContainerStyle={{
          borderBottomColor: COLORS.darkBlue,
          paddingBottom: 0,
        }}
        searchTextInputStyle={{borderWidth: 0}}
        listMode="MODAL"
        modalProps={{animationType: "slide", statusBarTranslucent: true}}
        modalContentContainerStyle={{
          backgroundColor: COLORS.secondary,
          paddingTop: 40,
        }}
      />
    </View>
  )
}

export default CustomDropdown;

const styles = StyleSheet.create({
  dropdownContainer: {
    backgroundColor: COLORS.secondary,
    borderWidth: 0.6,
    borderRadius: 3
  },
  dropdownLabel: {
    fontSize: 12,
    fontWeight: "100",
    color: COLORS.gray,
    backgroundColor: COLORS.secondary,
    top: 7,
    left: 10,
    zIndex: 9999999,
    alignSelf: 'flex-start',
    borderRadius: 7,
    paddingHorizontal: 3
  },
  container: {
    paddingTop: Platform.OS === 'ios' ? 0 : 50,
    backgroundColor: COLORS.secondary,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
      marginTop: 20,
      marginBottom: 10,
      height: 75,
      width: 200
  },

  inputView: {
      flex: 1,
    width: "85%",
        marginBottom: 20,
        margin: 2,
        paddingLeft: 5,
        // flexDirection: "row",
        justifyContent: "flex-start",
  },

  textBoxIcon: {
      paddingTop: 16,
      paddingRight: 10,
  },

  loginBtn: {
        width: "90%",
        borderRadius: 10,
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,
        backgroundColor: COLORS.blue,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: {width: 1, height: 13},
  },
    
  loginText: {
      color: 'white',
      marginLeft: 5,
    fontWeight: "bold",
      fontSize: 16
  },
  untilText: {
    marginHorizontal: 5,
    paddingVertical: 20,
    fontSize: 16,
  },
  textInput: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  }
});
