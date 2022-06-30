import React, { useEffect, useState } from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  FlatList,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import { COLORS, SIZES } from './app/constants/theme'
import { connect, useDispatch } from 'react-redux'
import { setSelectedTab } from './app/stores/tab/tabActions'
import Header from './app/components/Header'
import OpenMenu from './app/components/OpenMenu'
import TabButtons from './app/navigation/bottomTabs'
import { useIsDrawerOpen } from '@react-navigation/drawer'
import { DRAWER_ITEMS } from './app/constants/drawerItems'
import CalendarAgenda from './app/components/calenderAgenda'

const MainLayout = (props) => {
  const dispatch = useDispatch()
  const { selectedTab, navigation, drawerAnimationStyle, route, currentUser } =
    props
  const isOpen = useIsDrawerOpen()

  useEffect(() => {
    dispatch(setSelectedTab('Home'))
  }, [])

  return (
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
      <CalendarAgenda {...props} />
      {/*Footer*/}
      <View
        style={{
          height: 100,
          justifyContent: 'flex-end',
        }}
      >
        {/*Shadow*/}
        <LinearGradient
          // Background Linear Gradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 4 }}
          colors={[COLORS.transparent, COLORS.lightGray1]}
          style={{
            position: 'absolute',
            top: -20,
            left: 0,
            right: 0,
            height: 100,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        />
        {/*Tabs*/}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: SIZES.radius,
            paddingBottom: 10,
            borderRadius: 20,
            backgroundColor: COLORS.secondary,
          }}
        >
          {DRAWER_ITEMS.slice(0, 4).map(({ id, label, icon, screen }) => (
            <TabButtons
              key={id}
              label={label}
              icon={icon}
              isFocused={selectedTab === label}
              onPress={() => {
                dispatch(setSelectedTab(label))
                navigation.navigate(screen)
              }}
              // outerContainerStyle={selectedTab === label ? selectedFlexStyle : flexStyle}
              // innerContainerStyle={selectedTab === label ? selectedColorStyle : colorStyle}
            />
          ))}
        </View>
      </View>
    </Animated.View>
  )
}

const mapStateToProps = (state) => {
  return {
    selectedTab: state.tabReducer.selectedTab,
    currentUser: state.authReducer.currentUser,
  }
}

export default connect(mapStateToProps)(MainLayout)
