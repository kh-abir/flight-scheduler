import { useState } from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { COLORS } from '../../constants/theme'
import MainLayout from '../../screens/MainLayout'
import CustomDrawerContent from './CustomDrawerContent'
import HomeScreen from '../../screens/HomeScreen'
import SettingsScreen from '../../screens/SettingsScreen'
import LoginScreen from '../../screens/LoginScreen'
import HelpCenterScreen from '../../screens/HelpCenterScreen'
import NewAppointmentScreen from '../../screens/NewAppointmentScreen'
import ClientsScreen from '../../screens/ClientsScreen'
import NewClientScreen from '../../screens/NewClientScreen'
import PaymentsScreen from '../../screens/PaymentsScreen'
import NewPaymentScreen from '../../screens/NewPaymentScreen'
import AppointmentForm from '../../screens/AppointmentForm'
import ClientForm from '../../screens/ClientForm'

const Drawer = createDrawerNavigator()
const CustomDrawer = () => {
  const [progress, setProgress] = useState(new Animated.Value(0))
  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  })
  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 26],
  })
  const animatedStyle = { borderRadius, transform: [{ scale }] }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <Drawer.Navigator
        drawerType={'slide'}
        overlayColor={'transparent'}
        drawerStyle={{
          flex: 1,
          width: '65%',
          paddingRight: 20,
          backgroundColor: 'transparent',
        }}
        sceneContainerStyle={{
          backgroundColor: 'transparent',
        }}
        initialRouteName="LoginScreen"
        drawerContent={(props) => {
          setTimeout(() => {
            setProgress(props.progress)
          }, 0)
          return <CustomDrawerContent navigation={props.navigation} />
        }}
      >
        <Drawer.Screen name="MainLayout" options={{ unmountOnBlur: true }}>
          {(props) => (
            <MainLayout {...props} drawerAnimationStyle={animatedStyle} />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="HomeScreen">
          {(props) => (
            <HomeScreen {...props} drawerAnimationStyle={animatedStyle} />
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="NewAppointmentScreen"
          options={{ unmountOnBlur: true }}
        >
          {(props) => (
            <NewAppointmentScreen
              {...props}
              drawerAnimationStyle={animatedStyle}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="ClientsScreen" options={{ unmountOnBlur: true }}>
          {(props) => (
            <ClientsScreen {...props} drawerAnimationStyle={animatedStyle} />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="NewClientScreen" options={{ unmountOnBlur: true }}>
          {(props) => (
            <NewClientScreen {...props} drawerAnimationStyle={animatedStyle} />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="PaymentsScreen">
          {(props) => (
            <PaymentsScreen {...props} drawerAnimationStyle={animatedStyle} />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="NewPaymentScreen">
          {(props) => (
            <NewPaymentScreen {...props} drawerAnimationStyle={animatedStyle} />
          )}
        </Drawer.Screen>

        <Drawer.Screen name="SettingsScreen">
          {(props) => (
            <SettingsScreen {...props} drawerAnimationStyle={animatedStyle} />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="HelpCenterScreen">
          {(props) => (
            <HelpCenterScreen {...props} drawerAnimationStyle={animatedStyle} />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="AppInfoScreen">
          {(props) => (
            <AppInfoScreen {...props} drawerAnimationStyle={animatedStyle} />
          )}
        </Drawer.Screen>

        <Drawer.Screen name="LoginScreen">
          {(props) => (
            <LoginScreen {...props} drawerAnimationStyle={animatedStyle} />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="AppointmentForm" options={{ unmountOnBlur: true }}>
          {(props) => (
            <AppointmentForm {...props} drawerAnimationStyle={animatedStyle} />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="ClientForm" options={{ unmountOnBlur: true }}>
          {(props) => (
            <ClientForm {...props} drawerAnimationStyle={animatedStyle} />
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  )
}

export default CustomDrawer
