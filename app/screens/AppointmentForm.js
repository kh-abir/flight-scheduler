import React, { useState } from 'react';
import _ from 'underscore';
import {
  Platform,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {AntDesign} from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';
import Header from '../components/Header';
import moment from "moment";
import BackButton from '../components/BackButton';
import { TextInput } from 'react-native-paper';
import { useEffect } from 'react';
import CustomDropdown from '../components/CustomDropdown';
import CustomDatepicker from '../components/CustomDatepicker';
import axios from 'axios';
import { BASE_URL_APP } from '@env';
import { useNavigationState } from '@react-navigation/native';
import Loader from '../components/Loader';

const AppointmentForm = (props) => {
  const { route, navigation } = props;
  const response = route.params.item;
  const { appointment, locations, service_codes, clinicians, patients, procedure_code_modifiers, frequencies } = response;
  // const { id, clinician_id, start_at, end_at, location_id, patient_id, procedure_code_modifier_id, service_code_id } = appointment;

  const [isLoading, setIsLoading] = useState(false);
  const selectedItem = (list, val) => _.find(list, { 'id': val });
    // Dropdown List
  const buildDropdownList = (items, key) => {
    return items.map( item => {
      return {id: item.id, label: item[key], value: item[key] }
    });
  }
  const cliniciansList = buildDropdownList(clinicians, 'name');
  const codeModifierList = buildDropdownList(selectedItem(clinicians, (appointment?.clinician_id || clinicians[1].id))?.procedure_code_modifiers, 'name');
  const clientsList = buildDropdownList(patients, 'name');
  const serviceCodesList = buildDropdownList(service_codes, 'description');
  const unitsList = []; for (let i = 1; i <= 32; i++) unitsList.push({id: i, label: i, value: i })
  const locationsList = buildDropdownList(locations, 'name');
  const frequencyList = frequencies.map( item => {return {id: item, label: item, value: item }});
  // Selected States
  const [clinician, setClinician] = useState(selectedItem(clinicians, appointment?.clinician_id)?.name);
  const [client, setClient] = useState(selectedItem(patients, appointment?.patient_id)?.name);
  const [serviceCode, setServiceCode] = useState(selectedItem(service_codes, appointment?.service_code_id)?.description);
  const [location, setLocation] = useState(selectedItem(locations, appointment?.location_id)?.name);
  const [frequency, setFrequency] = useState(appointment?.frequency);
  const [units, setUnits] = useState(appointment?.units);
  const [reminder, setReminder] = useState(null);
  const [payer, setPayer] = useState(null);
  const [codeModifier, setCodeModifier] = useState(selectedItem(selectedItem(clinicians, appointment?.clinician_id)?.procedure_code_modifiers, appointment?.procedure_code_modifier_id)?.name);

  // Dropdown openner States
  const [clinicianDropDown, setClinicianDropDown] = useState(false);
  const [codeModifierDropDown, setCodeModifierDropDown] = useState(false);
  const [clientDropDown, setClientDropDown] = useState(false);
  const [serviceCodeDropDown, setServiceCodeDropDown] = useState(false);
  const [locationDropDown, setLocationDropDown] = useState(false);
  const [frequencyDropDown, setFrequencyDropDown] = useState(false);
  const [unitsDropDown, setUnitsDropDown] = useState(false);

  // Date States
  const [date, setDate] = useState(new Date(appointment?.start_at || Date.now()));
  const [scheduledUntil, setScheduledUntil] = useState(new Date(appointment?.scheduled_until || Date.now()));
  const [startTime, setStartTime] = useState(new Date(appointment?.start_at || Date.now()));
  const [endTime, setEndTime] = useState(new Date(appointment?.end_at || new Date(Date.now() + (60 * 60 * 1000))));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showScheduledDatePicker, setShowScheduledDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const [formObject, setFormObject] = useState({
    id: appointment?.id,
    clinician_id: appointment?.clinician_id,
    start_at: moment(startTime).format('YYYY-MM-DDTHH:mm'),
    end_at: moment(endTime).format('YYYY-MM-DDTHH:mm'),
  });

  const showPicker = type => {
    if (type == 'date') setShowDatePicker(true);
    else if(type == 'startTime') setShowStartTimePicker(true);
    else if(type == 'scheduledUntil') setShowScheduledDatePicker(true);
    else setShowEndTimePicker(true);
  };
  const onDateChange = (value) => {
    setShowDatePicker(false);
    setDate(value);
    handleDateTimeChange('date', value);
  };
  const onScheduledUntilDateChange = (value) => {
    setShowScheduledDatePicker(false);
    setScheduledUntil(value);
    setFormObject({
      ...formObject,
      scheduled_until: moment(value).format('YYYY-MM-DDTHH:mm'),
    })
  };
  const onStartTimeChange = (value) => {
    setShowStartTimePicker(false);
    setStartTime(value);
    handleDateTimeChange('startTime', value);
  };
  const onEndTimeChange = (value) => {
    setShowEndTimePicker(false);
    setEndTime(value);
    handleDateTimeChange('endTime', value);
  };

  const handleDateTimeChange = (type, value) => {
    const newDate = moment(type == 'date' ? value : date).format('YYYY-MM-DD');
    const newStartTime = moment(type == 'startTime' ? value : startTime).format('HH:mm');
    const newEndTime = moment(type == 'endTime' ? value : endTime).format('HH:mm');
    const changedStartTime = `${newDate}T${newStartTime}`;
    const changedEndTime = `${newDate}T${newEndTime}`;
    setFormObject({
      ...formObject,
      start_at: changedStartTime,
      end_at: changedEndTime
    })
  }

  const updateAppointment = async () => {
    const url = `${BASE_URL_APP}/appointments/${formObject.id}.json?`;
    axios.patch(url, { appointment: formObject })
      .then(response => response)
      .catch(err => err)
  };

  const createAppointment =  () => {
    const url = `${BASE_URL_APP}/appointments`;
    axios.post(url, { appointment: formObject })
      .then(response => response)
      .catch(err => err)
  };

  const handleSubmit = () => {
    if (formObject.id) {
      updateAppointment();
    } else {
      createAppointment();
    }
    navigation.navigate(route.params.previousScreen, { startAt: formObject.start_at });
  }

  const handleFrequencyChange = (value) => {
    console.log('==================handleOnChange==================');
    if (value !== 'One Time') {
      console.log(value);
    }
    console.log('====================================');
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}>
        {/* {isLoading && <Loader isLoading={isLoading}/>} */}
        {/* Header */}
        <Header
          containerStyle={{
              height: 50,
              paddingHorizontal: SIZES.padding,
              alignItems: 'center'
          }}
          title={appointment ? 'Edit Appointment' : 'New Appointment'}
          leftComponent={
            <BackButton
              navigation={navigation}
              previousScreen={route.params.previousScreen}
              params={{startAt: formObject.start_at}}
            />
          }
        />
        
        {/* Clinician Dropdown */}
        <CustomDropdown
          open={clinicianDropDown}
          setOpen={setClinicianDropDown}
          label={'Clinician'}
          value={clinician}
          setValue={setClinician}
          items={cliniciansList}
          formFieldID={'clinician_id'}
          formObject={formObject}
          setFormObject={setFormObject}
          searchPlaceholder={'Search Clinician...'}
        />
        {/* Code Modifier Dropdown */}
        <CustomDropdown
          open={codeModifierDropDown}
          setOpen={setCodeModifierDropDown}
          label={'Code Modifier'}
          value={codeModifier}
          setValue={setCodeModifier}
          items={codeModifierList}
          formFieldID={'code_modifier_id'}
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
        />
        {/* Payer */}
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            editable={false}
            label={"Payer"}
            mode={"outlined"}
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
        />
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
        />

        {/* Display the selected date */}
        <View style={styles.inputView}>
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
        </View>

        {/* Display the selected Time */}
        <View style={[styles.inputView]}>
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

        </View>

        <View style={[styles.inputView]}>
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
        </View>

        {/* Frequency Dropdown */}
        <CustomDropdown
          open={frequencyDropDown}
          setOpen={setFrequencyDropDown}
          label={'Frequency'}
          value={frequency}
          onChange={handleFrequencyChange}
          setValue={setFrequency}
          items={frequencyList}
          formFieldID={'frequency'}
          formObject={formObject}
          setFormObject={setFormObject}
          searchPlaceholder={'Search Frequency...'}
        />
        {frequency !== 'One Time' &&
          <View style={styles.inputView}>
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
          </View>
        }

        {/* Reminder */}
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            multiline={true}
            numberOfLines={5}
            label={"Reminder"}
            placeholder={'Reminder ok'}
            mode={"outlined"}
            value={reminder}
            onChangeText={text => setReminder(text)}
          />
        </View>

        {/* Submit Changes */}
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={{ ...styles.loginBtn, marginTop: 0 }}>
          {isLoading && <ActivityIndicator size="large" color="yellow" />}
          <AntDesign name="save" size={22} color="white"/>
          <Text style={styles.loginText}>Save</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
}

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

export default AppointmentForm;