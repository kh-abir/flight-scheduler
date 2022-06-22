import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Appearance,
  useColorScheme,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Animated from 'react-native-reanimated'
import { COLORS } from '../constants/theme'
import { BASE_URL_APP } from '@env'
import axios from 'axios'
import Loader from '../components/Loader'
import { TextInput, Switch } from 'react-native-paper'
import { useToast } from 'react-native-toast-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage'
import TherapymateLogo from '../components/TherapymateLogo'
import { connect } from 'react-redux'
import { authenticate } from '../stores/auth/authActions'

const LoginScreen = (props) => {
  const {
    navigation,
    drawerAnimationStyle,
    isAuthenticated,
    setAuthenticated,
  } = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const isDarkMode = useColorScheme() == 'dark'
  const toast = useToast()
  const showToast = (message, type) => {
    toast.show(message, {
      type: type,
      placement: 'bottom',
      duration: 2000,
      swipeEnabled: true,
      animationType: 'slide-in',
      animationDuration: 100,
    })
  }

  const saveAuthData = async (key, value) => {
    try {
      setAuthenticated(true)
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      showToast('Something went wrong', 'danger')
    }
  }

  useEffect(() => {
    setIsLoading(false)
    isAuthenticated ? navigation.navigate('MainLayout') : null
  }, [isAuthenticated])

  const [isEnabled, setIsEnabled] = useState(true)
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

  const login = () => {
    setIsLoading(true)
    const url = `${BASE_URL_APP}/sessions.json`
    const params = { username: email, password: password }
    axios
      .post(url, {}, { params })
      .then((response) => {
        saveAuthData('currentUser', response['data'])
        showToast(`Welcome ${response['data']['email']}`, 'success')
        setIsLoading(false)
        navigation.navigate('MainLayout')
      })
      .catch((err) => {
        showToast('Invalid credentials. Please try again', 'danger')
        setIsLoading(false)
      })
  }

  return (
    <Animated.View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.secondary,
        ...drawerAnimationStyle,
      }}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
          }}
        >
          <Loader isLoading={isLoading} />
          <TherapymateLogo />
          <View style={styles.inputView}>
            <TextInput
              mode="outlined"
              label="Email"
              keyboardType="email-address"
              style={styles.TextInput}
              activeOutlineColor={COLORS.blue}
              outlineColor={COLORS.blue1}
              placeholder="Enter Your Email"
              placeholderTextColor={COLORS.blue1}
              onChangeText={setEmail}
              right={
                <TextInput.Icon
                  onPress={console.log()}
                  name={'email-outline'}
                  size={30}
                  color={COLORS.blue1}
                />
              }
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              mode="outlined"
              label="Password"
              style={styles.TextInput}
              activeOutlineColor={COLORS.blue}
              outlineColor={COLORS.blue1}
              placeholder="Enter Your Password"
              placeholderTextColor={COLORS.blue1}
              onChangeText={setPassword}
              secureTextEntry
              right={
                <TextInput.Icon
                  onPress={console.log()}
                  name={'lock-outline'}
                  size={30}
                  color={COLORS.blue1}
                />
              }
            />
          </View>

          <View style={{ ...styles.loginAsBtnWrap, justifyContent: 'center' }}>
            <Switch onValueChange={toggleSwitch} value={isEnabled} />
            <Text style={styles.rememberMeText}>Remember Me</Text>

            <TouchableOpacity style={{ marginLeft: 35 }}>
              <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={login}
            style={{ ...styles.loginBtn, marginTop: 0 }}
          >
            <MaterialCommunityIcons
              name="login"
              size={25}
              color={COLORS.blue1}
            />
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CDE6F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    width: '90%',
    marginBottom: 20,
    margin: 2,
  },

  textBoxIcon: {
    paddingTop: 16,
    paddingRight: 10,
  },

  TextInput: {
    height: 50,
    flex: 1,
    backgroundColor: COLORS.secondary,
  },

  forgot_button: {
    height: 30,
    marginBottom: 10,
    paddingTop: 8,
    color: 'blue',
  },

  rememberMeText: {
    color: COLORS.blue1,
    fontWeight: '600',
    paddingTop: 8,
    marginLeft: 3,
  },

  loginBtn: {
    width: '100%',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: COLORS.blue2,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.7,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  loginText: {
    marginLeft: 5,
    fontWeight: '500',
    fontSize: 17,
    color: COLORS.blue1,
  },
  loginAsText: {
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#000',
    maxWidth: 250,
  },
  loginAs: {
    marginTop: 30,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'black',
  },
  loginAsBtnWrap: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 0,
    marginBottom: 10,
  },
  loginAsBtn: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '80%',
    borderRadius: 20,
    backgroundColor: '#88CBF1',
    color: '#000',
    paddingLeft: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  loginAsDelBtn: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
    marginLeft: 10,
  },
})

const mapStateToProps = (state) => {
  return {
    selectedTab: state.tabReducer.selectedTab,
    isAuthenticated: state.authReducer.isAuthenticated,
  }
}

const mapDispatchToProps = (dispatch) => ({
  setAuthenticated: (val) => dispatch(authenticate(val)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
