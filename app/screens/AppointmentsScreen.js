import React from 'react'
import { View, StyleSheet, TextInput, SafeAreaView, Text } from 'react-native'
import Animated from 'react-native-reanimated'
import { COLORS, SIZES } from '../constants/theme'
import Header from '../components/Header'
import { useIsDrawerOpen } from '@react-navigation/drawer'
import OpenMenu from '../components/OpenMenu'
import CalendarAgenda from '../components/calenderAgenda'
const AppointmentsScreen = (props) => {
  const { selectedTab, navigation, drawerAnimationStyle } = props
  const isOpen = useIsDrawerOpen()
  return (
    <SafeAreaView>
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: COLORS.secondary,
          ...drawerAnimationStyle,
        }}
      >
        {/*Header*/}
        <Header
          containerStyle={{
            height: 50,
            paddingHorizontal: SIZES.padding,
            marginTop: 40,
            alignItems: 'center',
          }}
          title={selectedTab}
          leftComponent={isOpen ? null : <OpenMenu navigation={navigation} />}
        />
        {/*Content*/}
        <CalendarAgenda />
        {/*Footer*/}
      </Animated.View>
    </SafeAreaView>
  )
}

export default AppointmentsScreen
