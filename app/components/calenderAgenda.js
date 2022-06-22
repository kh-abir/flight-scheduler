import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Agenda } from 'react-native-calendars'
import { COLORS } from '../constants/theme'
import moment from 'moment'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import axios from 'axios'
import _ from 'underscore'
import { useIsFocused } from '@react-navigation/native'
import { BASE_URL_APP, BASE_URL_V2 } from '@env'
import RenderAppointmentItem from './RenderAppointmentItem'
import Loader from './Loader'

const CalendarAgenda = (props) => {
  const { navigation, route } = props
  const [loading, setLoading] = useState(false)
  const selectedDate = moment(route.params?.startAt).format('YYYY-MM-DD')
  const [items, setItems] = useState({})
  const isFocused = useIsFocused()

  // useEffect(() => {
  //   fetchAppointments(moment().format('YYYY-MM-DD'), 'agendaWeek')
  // }, [])

  const fetchAppointments = (date, period) => {
    generateEmptyDate(date)
    if (items[date].length === 0) {
      setLoading(true)
      const url = `${BASE_URL_APP}/appointments.json?date=${date}`
      axios
        .get(url)
        .then((response) => {
          appendAppointments(response.data['appointments'])
          setLoading(false)
        })
        .catch((err) => err)
    }
  }

  const appendAppointments = (appointments) => {
    appointments.map((appointment) => {
      const appointmentDate = moment(appointment.start_at_time).format(
        'YYYY-MM-DD',
      )
      if (items[appointmentDate] === undefined) items[appointmentDate] = []
      if (
        _.find(items[appointmentDate], { id: appointment.id }) === undefined
      ) {
        items[appointmentDate].push(appointment)
      }
    })

    const newItems = {}
    Object.keys(items).forEach((key) => {
      newItems[key] = items[key]
    })
    setItems(newItems)
  }

  const generateEmptyDate = (date) => {
    for (let i = -15; i <= 15; i++) {
      const key = moment(date).add(i, 'days').format('YYYY-MM-DD')
      if (items[key] === undefined) items[key] = []
    }
  }

  const renderEmptyDate = () => {
    return (
      <TouchableOpacity
        onPress={() => editAppointmentForm('new')}
        style={{ marginRight: 10, marginTop: 17 }}
      >
        <View
          style={{
            height: 15,
            flex: 1,
            paddingTop: 30,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.black,
          }}
        />
      </TouchableOpacity>
    )
  }

  const editAppointmentForm = async (mode, appointmentId = null) => {
    let url = null
    if (mode === 'new') {
      url = `${BASE_URL_APP}/appointments/new.json`
    } else {
      url = `${BASE_URL_APP}/appointments/${appointmentId}.json`
    }
    axios
      .get(url)
      .then((response) => {
        navigation.navigate('AppointmentForm', {
          item: response.data,
          previousScreen: route.name,
        })
      })
      .catch((err) => err)
  }

  const renderItem = (item) => {
    return (
      <RenderAppointmentItem
        item={item}
        onPress={() => editAppointmentForm('edit', item.id)}
      />
    )
  }

  const renderKnob = () => {
    return (
      <View>
        <MaterialCommunityIcons name="chevron-down" size={30} color="black" />
      </View>
    )
  }

  return (
    <Agenda
      // selected={selectedDate}
      items={items}
      loadItemsForMonth={(day) => fetchAppointments(day.dateString, 'tableDay')}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
      onCalendarToggled={(calendarOpened) => setLoading(calendarOpened)}
      onDayPress={(day) => fetchAppointments(day.dateString, 'tableDay')}
      onDayChange={(day) => fetchAppointments(day.dateString, 'agendaWeek')}
      onRefresh={() => console.log('refreshing...')}
      refreshing={loading}
      // refreshControl={null}
      renderKnob={renderKnob}
      theme={{
        calendarBackground: COLORS.secondary,
        backgroundColor: COLORS.secondary,
        textSectionTitleColor: 'gray',
        agendaTodayColor: 'blue',
        agendaDayNumColor: 'green',
      }}
    />
  )
}

export default CalendarAgenda
