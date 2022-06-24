import { connect } from 'react-redux'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { View, Alert } from 'react-native'
import { COLORS, SIZES } from '../../constants/theme'
import CustomDrawerItem from './CustomDrawerItem'
import React, { useState, useEffect } from 'react'
import { name, version } from '../../../package.json'
import { DRAWER_ITEMS } from '../../constants/drawerItems'
import CloseMenu from '../../components/CloseMenu'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { authenticate } from '../../stores/auth/authActions'
import { setSelectedTab } from '../../stores/tab/tabActions'
import axios from 'axios'
import TherapymateLogo from '../../components/TherapymateLogo'
import { useToast } from 'react-native-toast-notifications'

const CustomDrawerContent = (props) => {
  const {
    navigation,
    isAuthenticated,
    setAuthenticated,
    setSelectedTab,
    selectedTab,
  } = props

  const toast = useToast()
  const readAuthData = async () => {
    let value = null
    try {
      value = await AsyncStorage.getItem('currentUser')
    } catch (e) {
    } finally {
      return JSON.parse(value)
    }
  }

  useEffect(() => {
    readAuthData().then((response) => {
      if (response?.token) {
        axios.defaults.headers.common['Authorization'] = response.token
        setAuthenticated(true)
      }
    })
  }, [isAuthenticated])

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('currentUser')
      axios.defaults.headers.common['Authorization'] = null
      setAuthenticated(false)
      toast.show('Succesfully logged out', { type: 'custom_success' })
      navigation.navigate('LoginScreen')
    } catch (e) {}
  }

  const handleLogin = () => {
    navigation.navigate('LoginScreen')
  }
  return (
    <DrawerContentScrollView
      scrollEnabled={true}
      contentContainerStyle={{ flex: 1 }}
    >
      <View style={{ flex: 1, paddingHorizontal: SIZES.radius }}>
        <CloseMenu navigation={navigation} />
        {/*Drawer Items*/}
        {isAuthenticated && (
          <View style={{ flex: 1, marginTop: SIZES.padding }}>
            {DRAWER_ITEMS.slice(0, 7).map(({ id, label, icon, screen }) => (
              <CustomDrawerItem
                key={id}
                label={label}
                icon={icon}
                isFocused={selectedTab === label}
                onPress={() => {
                  setSelectedTab(label)
                  navigation.navigate(screen)
                }}
              />
            ))}

            <View
              style={{
                height: 1,
                marginVertical: 40,
                marginLeft: SIZES.radius,
                backgroundColor: COLORS.darkBlue,
              }}
            />

            {DRAWER_ITEMS.slice(7, 10).map(
              ({ id, label, icon, iconType, screen }) => (
                <CustomDrawerItem
                  key={id}
                  label={label}
                  icon={icon}
                  iconType={iconType}
                  isFocused={selectedTab === label}
                  onPress={() => {
                    setSelectedTab(label)
                    screen === 'AppInfoScreen'
                      ? Alert.alert(
                          'App Info',
                          `Name: ${name}\nVersion: ${version}`,
                          [{ text: 'OK' }],
                        )
                      : navigation.navigate(screen)
                  }}
                />
              ),
            )}
          </View>
        )}

        {/*Login Button*/}
        <View style={{ marginBottom: SIZES.padding }}>
          {isAuthenticated ? (
            <CustomDrawerItem
              label={'Logout'}
              icon={'logout'}
              isFocused={false}
              onPress={() => logout()}
            />
          ) : (
            <>
              <TherapymateLogo />
              <CustomDrawerItem
                label={'Login'}
                icon={'login'}
                isFocused={selectedTab === 'Login'}
                onPress={() => handleLogin()}
              />
            </>
          )}
        </View>
      </View>
    </DrawerContentScrollView>
  )
}

const mapStateToProps = (state) => {
  return {
    selectedTab: state.tabReducer.selectedTab,
    isAuthenticated: state.authReducer.isAuthenticated,
  }
}

const mapDispatchToProps = (dispatch) => ({
  setSelectedTab: (label) => dispatch(setSelectedTab(label)),
  setAuthenticated: (val) => dispatch(authenticate(val)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawerContent)
