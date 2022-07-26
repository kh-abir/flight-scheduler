import React, { useState, useEffect } from 'react'
import {
  Platform,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native'
import _ from 'underscore'
import { ScrollView } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'
import { COLORS, SIZES } from '../constants/theme'
import Header from '../components/Header'
import moment from 'moment'
import BackButton from '../components/BackButton'
import { TextInput } from 'react-native-paper'
import CustomDropdown from '../components/CustomDropdown'
import CustomDatepicker from '../components/CustomDatepicker'
import axios from 'axios'
import { BASE_URL_APP } from '@env'
import { useNavigationState } from '@react-navigation/native'
import Loader from '../components/Loader'
import { useToast } from 'react-native-toast-notifications'
import { connect } from 'react-redux'
const AppointmentForm = (props) => {
  const toast = useToast()
  const { route, navigation, currentUser } = props
  const response = route.params.item
  const {
    appointment,
    locations,
    service_codes,
    clinicians,
    patients,
    procedure_code_modifiers,
    frequencies,
  } = response
  // const { id, clinician_id, start_at, end_at, location_id, patient_id, procedure_code_modifier_id, service_code_id } = appointment;

  const [isLoading, setIsLoading] = useState(false)
  const selectedItem = (list, val) => _.find(list, { id: val })
  const uniqList = (list) => _.uniq(list, 'label')
  // Dropdown List
  const buildDropdownList = (items, key) => {
    return items.map((item) => {
      return { id: item.id, label: item[key], value: item[key] }
    })
  }
  const cliniciansList = buildDropdownList(clinicians, 'name')
  const codeModifierList = buildDropdownList(
    selectedItem(clinicians, appointment?.clinician_id || 277)
      ?.procedure_code_modifiers,
    'name',
  )
  const clientsList = buildDropdownList(patients, 'name')

  const serviceCodesList = uniqList(
    buildDropdownList(service_codes, 'description'),
  )

  const unitsList = []
  for (let i = 1; i <= 32; i++) unitsList.push({ id: i, label: i, value: i })
  const locationsList = buildDropdownList(locations, 'name')
  const frequencyList = frequencies.map((item) => {
    return { id: item, label: item, value: item }
  })
  // Selected States
  const [clinician, setClinician] = useState(
    selectedItem(clinicians, appointment?.clinician_id || 277)?.name,
  )
  const [client, setClient] = useState(
    selectedItem(patients, appointment?.patient_id)?.name,
  )
  const [serviceCode, setServiceCode] = useState(
    selectedItem(service_codes, appointment?.service_code_id)?.description,
  )
  const [location, setLocation] = useState(
    selectedItem(locations, appointment?.location_id)?.name,
  )
  const [frequency, setFrequency] = useState(appointment?.frequency)
  const [units, setUnits] = useState(appointment?.units)
  const [reminder, setReminder] = useState(null)
  const [payer, setPayer] = useState(null)
  const [codeModifier, setCodeModifier] = useState(
    selectedItem(
      selectedItem(clinicians, appointment?.clinician_id)
        ?.procedure_code_modifiers,
      appointment?.procedure_code_modifier_id,
    )?.name,
  )

  // Dropdown openner States
  const [clinicianDropDown, setClinicianDropDown] = useState(false)
  const [codeModifierDropDown, setCodeModifierDropDown] = useState(false)
  const [clientDropDown, setClientDropDown] = useState(false)
  const [serviceCodeDropDown, setServiceCodeDropDown] = useState(false)
  const [locationDropDown, setLocationDropDown] = useState(false)
  const [frequencyDropDown, setFrequencyDropDown] = useState(false)
  const [unitsDropDown, setUnitsDropDown] = useState(false)

  // Date States
  const nearestHalfHour = () => {
    const min = moment().minute()
    return moment()
      .utc()
      .add(min > 30 && 1, 'hours')
      .minutes(min <= 30 ? 30 : 0)
      .format()
  }
  const formatToUTC = (date) => moment(date).utc().format()
  const formatToMDT = (date) => moment(date).format()

  const [date, setDate] = useState(new Date(formatToUTC(appointment?.start_at)))
  const [startTime, setStartTime] = useState(
    new Date(appointment?.start_at || nearestHalfHour()),
  )
  const [endTime, setEndTime] = useState(
    new Date(appointment?.end_at || moment(startTime).add(1, 'hour').format()),
  )
  const [scheduledUntil, setScheduledUntil] = useState(
    new Date(formatToUTC(appointment?.scheduled_until)),
  )
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showScheduledDatePicker, setShowScheduledDatePicker] = useState(false)
  const [showStartTimePicker, setShowStartTimePicker] = useState(false)
  const [showEndTimePicker, setShowEndTimePicker] = useState(false)

  const [formObject, setFormObject] = useState({
    id: appointment?.id,
    clinician_id: appointment?.clinician_id || currentUser?.clinician_id,
    start_at: formatToMDT(startTime),
    end_at: formatToMDT(endTime),
    scheduled_until: formatToMDT(scheduledUntil),
  })

  const [errors, setErrors] = useState({
    patient_id: Boolean(!(appointment?.patient_id || formObject?.patient_id)),
    service_code_id: Boolean(
      !(appointment?.service_code_id || formObject?.service_code_id),
    ),
    location_id: Boolean(
      !(appointment?.location_id || formObject?.location_id),
    ),
  })

  const isValidForm = () => {
    const { patient_id, service_code_id, location_id } = errors
    return Boolean(!(patient_id || service_code_id || location_id))
  }

  const showPicker = (type) => {
    if (type == 'date') setShowDatePicker(true)
    else if (type == 'startTime') setShowStartTimePicker(true)
    else if (type == 'scheduledUntil') setShowScheduledDatePicker(true)
    else setShowEndTimePicker(true)
  }
  const onDateChange = (value) => {
    setShowDatePicker(false)
    setDate(value)
    handleDateTimeChange('date', value)
  }
  const onScheduledUntilDateChange = (value) => {
    setShowScheduledDatePicker(false)
    setScheduledUntil(value)
    setFormObject({
      ...formObject,
      scheduled_until: moment(value).format('YYYY-MM-DDTHH:mm'),
    })
  }
  const onStartTimeChange = (value) => {
    setShowStartTimePicker(false)
    setStartTime(value)
    handleDateTimeChange('startTime', value)
  }
  const onEndTimeChange = (value) => {
    setShowEndTimePicker(false)
    setEndTime(value)
    handleDateTimeChange('endTime', value)
  }

  const handleDateTimeChange = (type, value) => {
    const newDate = moment(type == 'date' ? value : date).format('YYYY-MM-DD')
    const newStartTime = moment(type == 'startTime' ? value : startTime).format(
      'HH:mm',
    )
    const newEndTime = moment(type == 'endTime' ? value : endTime).format(
      'HH:mm',
    )
    const changedStartTime = `${newDate}T${newStartTime}`
    const changedEndTime = `${newDate}T${newEndTime}`

    setFormObject({
      ...formObject,
      start_at: changedStartTime,
      end_at: changedEndTime,
    })
  }

  const updateAppointment = () => {
    setIsLoading(true)
    const url = `/appointments/${formObject.id}.json`
    axios
      .patch(url, { appointment: formObject })
      .then((response) => {
        toast.show('Appointment Updated Succesfully', {
          type: 'custom_success',
        })
        setIsLoading(false)
        navigation.navigate('MainLayout')
      })
      .catch((err) => {
        setIsLoading(false)
        toast.show('Something went wrong', { type: 'custom_danger' })
      })
  }

  const createAppointment = () => {
    setIsLoading(true)
    const url = `/appointments.json`
    axios
      .post(url, { appointment: formObject })
      .then((response) => {
        toast.show('Appointment Created Succesfully', {
          type: 'custom_success',
        })
        setIsLoading(false)
        navigation.navigate('MainLayout')
      })
      .catch((err) => {
        setIsLoading(false)
        toast.show('Something went wrong', { type: 'custom_danger' })
      })
  }

  const handleSubmit = () => {
    if (isValidForm()) {
      if (formObject.id) {
        updateAppointment()
      } else {
        createAppointment()
      }
    } else {
      toast.show('Required field can not be empty', {
        type: 'custom_danger',
      })
    }
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
        <Loader isLoading={isLoading} />
        {/* Header */}
        <Header
          containerStyle={{
            height: 50,
            paddingHorizontal: SIZES.padding,
            alignItems: 'center',
          }}
          title={appointment ? 'Edit Appointment' : 'New Appointment'}
          leftComponent={<BackButton navigation={navigation} />}
        />

        {/* Code Modifier Dropdown */}
        <CustomDropdown
          open={codeModifierDropDown}
          setOpen={setCodeModifierDropDown}
          label={'Code Modifier'}
          value={codeModifier}
          setValue={setCodeModifier}
          items={codeModifierList}
          formFieldID={'procedure_code_modifier_id'}
          formObject={formObject}
          setFormObject={setFormObject}
          searchPlaceholder={'Search Code Modifier...'}
        />
        {/* Client Dropdown */}
        <CustomDropdown
          open={clientDropDown}
          setOpen={setClientDropDown}
          label={'Client'}
          value={client}
          setValue={setClient}
          items={clientsList}
          formFieldID={'patient_id'}
          formObject={formObject}
          setFormObject={setFormObject}
          searchPlaceholder={'Search Client...'}
          errors={errors}
          setErrors={setErrors}
        />

        {errors.patient_id && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorMessage}>Client is required</Text>
          </View>
        )}
        {/* Payer */}
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            editable={false}
            label={'Payer'}
            mode={'outlined'}
            value={payer}
          />
        </View>
        {/* Service Code Dropdown */}
        <CustomDropdown
          open={serviceCodeDropDown}
          setOpen={setServiceCodeDropDown}
          label={'Service Code'}
          value={serviceCode}
          setValue={setServiceCode}
          items={serviceCodesList}
          formFieldID={'service_code_id'}
          formObject={formObject}
          setFormObject={setFormObject}
          searchPlaceholder={'Search Service Code...'}
          errors={errors}
          setErrors={setErrors}
        />
        {errors.service_code_id && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorMessage}>Service Code is required</Text>
          </View>
        )}
        {/* Units Dropdown */}
        <CustomDropdown
          open={unitsDropDown}
          setOpen={setUnitsDropDown}
          label={'Units'}
          value={units}
          setValue={setUnits}
          items={unitsList}
          formFieldID={'units'}
          formObject={formObject}
          setFormObject={setFormObject}
          searchPlaceholder={'Search Units...'}
        />
        {/* Location Dropdown */}
        <CustomDropdown
          open={locationDropDown}
          setOpen={setLocationDropDown}
          label={'Location'}
          value={location}
          setValue={setLocation}
          items={locationsList}
          formFieldID={'location_id'}
          formObject={formObject}
          setFormObject={setFormObject}
          searchPlaceholder={'Search Location...'}
          errors={errors}
          setErrors={setErrors}
        />
        {errors.location_id && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorMessage}>Location is required</Text>
          </View>
        )}

        {/* Display the selected date */}
        <CustomDatepicker
          label={'Date'}
          mode={'date'}
          placeholderText={'Select Date'}
          iconName={'calendar-month-outline'}
          value={date}
          onPress={() => showPicker('date')}
          show={showDatePicker}
          // onChange={onDateChange}
          onConfirm={onDateChange}
          onCancel={() => setShowDatePicker(false)}
        />

        {/* Display the selected Time */}
        <CustomDatepicker
          label={'Start Time'}
          mode={'time'}
          placeholderText={'Select Start Time'}
          iconName={'clock-outline'}
          value={startTime}
          onPress={() => showPicker('startTime')}
          show={showStartTimePicker}
          // onChange={onStartTimeChange}
          onConfirm={onStartTimeChange}
          onCancel={() => setShowStartTimePicker(false)}
        />
        {/* End Time */}
        <CustomDatepicker
          label={'End Time'}
          mode={'time'}
          placeholderText={'Select End Time'}
          iconName={'clock-outline'}
          value={endTime}
          onPress={() => showPicker('endTime')}
          show={showEndTimePicker}
          // onChange={onEndTimeChange}
          onConfirm={onEndTimeChange}
          onCancel={() => setShowEndTimePicker(false)}
        />

        {/* Frequency Dropdown */}
        <CustomDropdown
          open={frequencyDropDown}
          setOpen={setFrequencyDropDown}
          label={'Frequency'}
          value={frequency}
          // onChange={handleFrequencyChange}
          setValue={setFrequency}
          items={frequencyList}
          formFieldID={'frequency'}
          formObject={formObject}
          setFormObject={setFormObject}
          searchPlaceholder={'Search Frequency...'}
        />
        {frequency && frequency !== 'One Time' && (
          <CustomDatepicker
            label={'Scheduled Until'}
            mode={'date'}
            placeholderText={'Select Date'}
            iconName={'calendar-month-outline'}
            value={scheduledUntil}
            onPress={() => showPicker('scheduledUntil')}
            show={showScheduledDatePicker}
            onConfirm={onScheduledUntilDateChange}
            onCancel={() => setShowScheduledDatePicker(false)}
          />
        )}

        {/* Reminder */}
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            multiline={true}
            numberOfLines={5}
            label={'Reminder'}
            placeholder={'Reminder ok'}
            mode={'outlined'}
            value={reminder}
            onChangeText={(text) => setReminder(text)}
          />
        </View>

        {/* Submit Changes */}
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={{ ...styles.loginBtn, marginTop: 0 }}
        >
          <AntDesign name="save" size={22} color="white" />
          <Text style={styles.loginText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    currentUser: state.authReducer.currentUser,
  }
}

const styles = StyleSheet.create({
  dropdownContainer: {
    backgroundColor: COLORS.secondary,
    borderWidth: 0.6,
    borderRadius: 3,
  },
  dropdownLabel: {
    fontSize: 12,
    fontWeight: '100',
    color: COLORS.gray,
    backgroundColor: COLORS.secondary,
    top: 7,
    left: 10,
    zIndex: 9999999,
    alignSelf: 'flex-start',
    borderRadius: 7,
    paddingHorizontal: 3,
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
    width: 200,
  },

  inputView: {
    flex: 1,
    width: '85%',
    marginBottom: 20,
    margin: 2,
    paddingLeft: 5,
    justifyContent: 'flex-start',
  },

  textBoxIcon: {
    paddingTop: 16,
    paddingRight: 10,
  },

  loginBtn: {
    width: '90%',
    borderRadius: 6,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    backgroundColor: COLORS.blue,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },

  loginText: {
    color: 'white',
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
  untilText: {
    marginHorizontal: 5,
    paddingVertical: 20,
    fontSize: 16,
  },
  textInput: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  errorContainer: {
    alignSelf: 'flex-start',
    marginLeft: 40,
  },
  errorMessage: {
    color: COLORS.darkRed,
    marginTop: -20,
    paddingBottom: 10,
    fontWeight: 'normal',
  },
})

export default connect(mapStateToProps)(AppointmentForm)
