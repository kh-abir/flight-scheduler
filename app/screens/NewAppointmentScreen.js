import React from 'react'
import { View, SafeAreaView, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { COLORS } from '../constants/theme'
import { useEffect } from 'react'
import { BASE_URL_APP } from '@env'
import axios from 'axios'

const NewAppointmentScreen = (props) => {
  const { navigation } = props
  const url = `${BASE_URL_APP}/appointments/new.json`
  axios
    .get(url)
    .then((response) => {
      navigation.navigate('AppointmentForm', {
        item: response.data,
        previousScreen: 'MainLayout',
      })
    })
    .catch((err) => err)

  return (
    <Animated.View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.secondary,
      }}
    >
      <SafeAreaView />
    </Animated.View>
  )
}

export default NewAppointmentScreen
