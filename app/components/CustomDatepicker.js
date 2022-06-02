import React from 'react'
import {
  Platform,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { TextInput } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import moment from "moment";

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
  onCancel
}) => {
  const selectedValue = mode === 'date' ? moment(value).format("MMMM d, YYYY") : moment(value).format("h:mm a");
  // console.log(selectedValue);
  return (
    <>
      <TextInput
        style={styles.textInput}
        editable={false}
        label={label}
        placeholder={placeholderText}
        mode={"outlined"}
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
        date={value}
        mode={mode}
        display={'spinner'}
        // onChange={onChange}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </>
  )
}

export default CustomDatepicker;

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