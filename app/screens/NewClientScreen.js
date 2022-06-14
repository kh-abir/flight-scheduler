import React, { useEffect } from 'react'
import { View, SafeAreaView, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { COLORS } from '../constants/theme'
import axios from 'axios'
import { BASE_URL_APP } from '@env'

const NewClientScreen = (props) => {
  const { navigation } = props
  useEffect(() => {
    const url = `${BASE_URL_APP}/patients/new.json`
    axios
      .get(url)
      .then((response) => {
        navigation.navigate('ClientForm', {
          item: response.data,
          previousScreen: 'MainLayout',
        })
      })
      .catch((err) => err)
  }, [])

  return (
    <Animated.View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.secondary,
      }}
    >
      <SafeAreaView></SafeAreaView>
    </Animated.View>
  )
}

export default NewClientScreen
