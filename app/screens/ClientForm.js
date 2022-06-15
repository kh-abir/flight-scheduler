import React, { useState } from 'react'
import {
  Platform,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'
import { COLORS, SIZES } from '../constants/theme'
import Header from '../components/Header'
import moment from 'moment'
import BackButton from '../components/BackButton'
import CustomDropdown from '../components/CustomDropdown'
import CustomDatepicker from '../components/CustomDatepicker'
import axios from 'axios'
import { BASE_URL_APP } from '@env'
import CustomTextInput from '../components/CustomTextInput'
import {
  GENDER,
  MOBILE_MESSAGES,
  PHONE_MESSAGES,
  PREFERRED_PHONE,
} from '../constants/gender'
import { STATES } from '../constants/index'

const ClientForm = (props) => {
  const { route, navigation } = props
  const response = route.params.item
  const { patient, carriers } = response ?? {}

  const [formObject, setFormObject] = useState({
    id: patient?.id,
    clinician_id: 277,
  })

  const getFormFieldValue = (property) =>
    formObject[property] || patient?.[property] || null

  const [showGenderDropDown, setShowGenderDropDown] = useState(false)
  const genderList = GENDER.map((item) => {
    return { id: item, label: item, value: item }
  })

  const [showCarrierDropDown, setShowCarrierDropDown] = useState(false)
  const carrierList = carriers.map((item) => {
    return { id: item, label: item, value: item }
  })

  const [showStateDropDown, setShowStateDropDown] = useState(false)
  const stateList = STATES.map((item) => {
    return { id: item, label: item, value: item }
  })

  const [homePhoneMessages, setHomePhoneMessages] = useState(false)
  const homePhoneList = PHONE_MESSAGES.map((item) => {
    return { id: item, label: item, value: item }
  })

  const [mobilePhoneMessages, setMobilePhoneMessages] = useState(false)
  const mobilePhoneList = MOBILE_MESSAGES.map((item) => {
    return { id: item, label: item, value: item }
  })

  const [preferredPhoneDropDown, setPreferredPhoneDropDown] = useState(false)
  const preferredPhoneList = PREFERRED_PHONE.map((item) => {
    return { id: item.value, label: item.name, value: item.value }
  })

  const [showDatePicker, setShowDatePicker] = useState(false)
  const onDateChange = (date) => {
    setShowDatePicker(false)
    handleInputTextChange('date_of_birth', moment(date).format('MM/DD/YYYY'))
  }

  const handleInputTextChange = (key, value) => {
    setFormObject({
      ...formObject,
      [key]: value,
    })
  }

  const updatePatient = () => {
    const url = `${BASE_URL_APP}/patients/${formObject.id}.json`
    axios
      .patch(url, { patient: formObject })
      .then((response) => response)
      .catch((err) => err)
  }

  const createPatient = () => {
    const url = `${BASE_URL_APP}/patients.json`
    axios
      .post(url, { patient: formObject })
      .then((response) => response)
      .catch((err) => err)
  }

  const handleSubmit = () => {
    if (formObject.id) {
      updatePatient()
    } else {
      createPatient()
    }
    navigation.navigate('MainLayout')
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Header */}
        <Header
          containerStyle={{
            height: 50,
            paddingHorizontal: SIZES.padding,
            alignItems: 'center',
          }}
          title={formObject?.id ? 'Edit Patient' : 'New Patient'}
          leftComponent={<BackButton navigation={navigation} />}
        />
        <CustomTextInput
          label={'Email'}
          placeholder={'Enter Your Email'}
          keyboardType={'email-address'}
          value={getFormFieldValue('email')}
          onChangeText={(text) => handleInputTextChange('email', text)}
        />
        <CustomTextInput
          label={'First Name'}
          placeholder={'Enter First Name'}
          value={getFormFieldValue('firstname')}
          onChangeText={(text) => handleInputTextChange('firstname', text)}
        />
        <CustomTextInput
          label={'Last Name'}
          placeholder={'Enter Last Name'}
          value={getFormFieldValue('lastname')}
          onChangeText={(text) => handleInputTextChange('lastname', text)}
        />
        <CustomTextInput
          label={'Address 1'}
          placeholder={'Enter Address 1'}
          value={getFormFieldValue('address1')}
          onChangeText={(text) => handleInputTextChange('address1', text)}
        />
        <CustomTextInput
          label={'Address 2'}
          placeholder={'Enter Address 2'}
          value={getFormFieldValue('address2')}
          onChangeText={(text) => handleInputTextChange('address2', text)}
        />
        <CustomTextInput
          label={'City'}
          placeholder={'Enter City'}
          value={getFormFieldValue('city')}
          onChangeText={(text) => handleInputTextChange('city', text)}
        />
        <CustomDropdown
          open={showStateDropDown}
          setOpen={setShowStateDropDown}
          label={'State'}
          value={getFormFieldValue('state')}
          items={stateList}
          formFieldID={'state'}
          formObject={formObject}
          setFormObject={setFormObject}
          searchPlaceholder={'Search State...'}
        />
        <CustomDatepicker
          label={'Date of Birth'}
          mode={'date'}
          placeholderText={'Select Date'}
          iconName={'calendar-month-outline'}
          value={getFormFieldValue('date_of_birth')}
          onPress={() => setShowDatePicker(true)}
          show={showDatePicker}
          onConfirm={onDateChange}
          onCancel={() => setShowDatePicker(false)}
        />
        <CustomDropdown
          open={showGenderDropDown}
          setOpen={setShowGenderDropDown}
          label={'Gender'}
          value={getFormFieldValue('gender')}
          items={genderList}
          formFieldID={'gender'}
          formObject={formObject}
          setFormObject={setFormObject}
          searchPlaceholder={'Search Gender...'}
        />
        <CustomDropdown
          open={showCarrierDropDown}
          setOpen={setShowCarrierDropDown}
          label={'Mobile Carrier'}
          value={getFormFieldValue('mobile_carrier')}
          items={carrierList}
          formFieldID={'mobile_carrier'}
          formObject={formObject}
          setFormObject={setFormObject}
          searchPlaceholder={'Search Mobile Carrier...'}
        />
        <CustomTextInput
          label={'Homephone'}
          placeholder={'Enter Homephone'}
          value={getFormFieldValue('homephone')}
          keyboardType={'phone-pad'}
          onChangeText={(text) => handleInputTextChange('homephone', text)}
        />
        <CustomTextInput
          label={'Mobilephone'}
          placeholder={'Enter Mobilephone'}
          value={getFormFieldValue('mobilephone')}
          keyboardType={'phone-pad'}
          onChangeText={(text) => handleInputTextChange('mobilephone', text)}
        />
        <CustomTextInput
          label={'Actionable Homephone'}
          placeholder={'Enter Actionable Homephone'}
          value={getFormFieldValue('actionable_homephone')}
          keyboardType={'phone-pad'}
          onChangeText={(text) =>
            handleInputTextChange('actionable_homephone', text)
          }
        />
        <CustomTextInput
          label={'Actionable Mobilephone'}
          placeholder={'Enter Actionable Mobilephone'}
          value={getFormFieldValue('actionable_mobilephone')}
          keyboardType={'phone-pad'}
          onChangeText={(text) =>
            handleInputTextChange('actionable_mobilephone', text)
          }
        />
        <CustomDropdown
          open={homePhoneMessages}
          setOpen={setHomePhoneMessages}
          label={'Homephone Messages'}
          value={getFormFieldValue('homephonemessage')}
          items={homePhoneList}
          formFieldID={'homephonemessage'}
          formObject={formObject}
          setFormObject={setFormObject}
          searchPlaceholder={'Search Homephone Messages...'}
        />
        <CustomDropdown
          open={mobilePhoneMessages}
          setOpen={setMobilePhoneMessages}
          label={'Mobilephone Messages'}
          value={getFormFieldValue('mobilephonemessage')}
          items={mobilePhoneList}
          formFieldID={'mobilephonemessage'}
          formObject={formObject}
          setFormObject={setFormObject}
          searchPlaceholder={'Search Mobilephone Messages...'}
        />
        <CustomDropdown
          open={preferredPhoneDropDown}
          setOpen={setPreferredPhoneDropDown}
          label={'Preferred Phone'}
          value={getFormFieldValue('preferredphone')}
          items={preferredPhoneList}
          formFieldID={'preferredphone'}
          formObject={formObject}
          setFormObject={setFormObject}
          searchPlaceholder={'Search Preferred Phone...'}
        />
        {/* Submit Changes */}
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={styles.submitBtn}
        >
          <AntDesign name="save" size={22} color="white" />
          <Text style={styles.submitText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 0 : 50,
    backgroundColor: COLORS.secondary,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  submitBtn: {
    width: '90%',
    borderRadius: 10,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: COLORS.blue,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },

  submitText: {
    color: 'white',
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default ClientForm
