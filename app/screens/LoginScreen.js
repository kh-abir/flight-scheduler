import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Appearance,
  useColorScheme,
  Alert,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import Animated from 'react-native-reanimated'
import { COLORS } from '../constants/theme'
import axios from 'axios'
import Loader from '../components/Loader'
import { TextInput, Switch } from 'react-native-paper'
import { useToast } from 'react-native-toast-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage'
import TherapymateLogo from '../components/TherapymateLogo'
import { connect } from 'react-redux'
import { authenticate, setCurrentUser } from '../stores/auth/authActions'
import moment from 'moment'
import _ from 'underscore'

const LoginScreen = (props) => {
  const {
    navigation,
    drawerAnimationStyle,
    isAuthenticated,
    setAuthenticated,
    setCurrentUser,
  } = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const isDarkMode = useColorScheme() == 'dark'
  const toast = useToast()
  const saveAuthData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
      setAuthenticated(true)
      setCurrentUser(value)
      axios.defaults.params = { email: value.email, token: value.token }
    } catch (e) {
      toast.show('Something went wrong', { type: 'custom_danger' })
    }
  }

  const [users, setUsers] = useState()
  useEffect(() => {
    AsyncStorage.getItem('users').then((res) => {
      setUsers(JSON.parse(res))
    })
    setIsLoading(false)
    isAuthenticated ? navigation.navigate('MainLayout') : null
  }, [isAuthenticated])

  const initiateLogin = () => {
    if (email && password) {
      Alert.alert(
        'Save your login information',
        'Next time you log in on this device, just tap your email instead of typing a password',
        [
          {
            text: 'Ask me later',
            onPress: () => proceedToLogin('Ask me later'),
          },
          { text: 'Save', onPress: () => proceedToLogin('Save') },
        ],
      )
    } else {
      toast.show("Email or password can't be blank", {
        type: 'custom_danger',
      })
    }
  }

  const proceedToLogin = (rememberPassword) => {
    const user = { username: email, password: password }
    if (
      rememberPassword == 'Save' &&
      _.find(users, { username: email }) == undefined
    ) {
      let currentUsers = users || []
      currentUsers.push(user)
      setUsers(currentUsers)
      AsyncStorage.setItem('users', JSON.stringify(currentUsers))
    }
    login(user)
  }

  const login = (user) => {
    setIsLoading(true)
    const params = user
    axios
      .post('/sessions.json', {}, { params })
      .then((response) => {
        let data = response['data']
        data['login_time'] = moment().format()
        saveAuthData('currentUser', data).then((res) => {
          setIsLoading(false)
          navigation.navigate('MainLayout')
        })
        const msg = `Welcome ${response['data']['email']}`
        toast.show(msg, {
          type: 'custom_success',
        })
      })
      .catch((err) => {
        toast.show('Invalid credentials. Please try again', {
          type: 'custom_danger',
        })
        setIsLoading(false)
      })
  }

  const loginAs = (username, password) => {
    login({ username: username, password: password })
  }

  const deleteSavedCredentials = (username, password) => {
    Alert.alert(
      'Remove account from this device?',
      "You'll need to enter your email and password manually to log in again",
      [
        {
          text: 'Cancel',
          onPress: () => deleteCredentials('Cancel'),
        },
        {
          text: 'Remove Account',
          onPress: () => deleteCredentials('Remove Account', username),
        },
      ],
    )
  }

  const deleteCredentials = (deletionState, username = null) => {
    if (deletionState == 'Remove Account') {
      let currentUsers = users
      currentUsers = currentUsers.filter((user) => user.username != username)
      currentUsers = currentUsers.length ? currentUsers : null
      setUsers(currentUsers)
      AsyncStorage.setItem('users', JSON.stringify(currentUsers))
    }
  }

  return (
    <Animated.View style={[animatedView, drawerAnimationStyle]}>
      <SafeAreaView style={container}>
        <Loader isLoading={isLoading} />
        <ScrollView style={scrollView} contentContainerStyle={scrollContent}>
          <TherapymateLogo />
          <View style={inputView}>
            <TextInput
              mode="flat"
              label="Email"
              caretHidden={false}
              keyboardType="email-address"
              style={textInput}
              activeUnderlineColor={COLORS.blue}
              underlineColor={COLORS.blue1}
              placeholder="Enter Your Email"
              placeholderTextColor={COLORS.blue1}
              value={email}
              onChangeText={setEmail}
              right={
                <TextInput.Icon
                  onPress={console.log()}
                  name={'email-outline'}
                  size={25}
                  color={COLORS.blue1}
                />
              }
            />
          </View>

          <View style={inputView}>
            <TextInput
              mode="flat"
              label="Password"
              style={textInput}
              activeUnderlineColor={COLORS.blue}
              underlineColor={COLORS.blue1}
              placeholder="Enter Your Password"
              placeholderTextColor={COLORS.blue1}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              right={
                <TextInput.Icon
                  onPress={console.log()}
                  name={'lock-outline'}
                  size={25}
                  color={COLORS.blue1}
                />
              }
            />
          </View>

          <TouchableOpacity style={loginBtn} onPress={initiateLogin}>
            <MaterialCommunityIcons
              name="login"
              size={25}
              color={COLORS.blue1}
            />
            <Text style={loginText}>LOGIN</Text>
          </TouchableOpacity>

          {users && (
            <View style={loginAsContainer}>
              <View style={loginDivider}>
                <Text style={loginDividerText}>OR</Text>
              </View>
              <Text style={loginAsText}>Continue with</Text>
              {users.map((user, idx) => {
                return (
                  <TouchableOpacity
                    key={idx}
                    style={loginAsBtn}
                    onPress={() => {
                      loginAs(user.username, user.password)
                    }}
                    onLongPress={() => deleteSavedCredentials(user.username)}
                  >
                    <Text style={loginAsBtnText}>{user.username}</Text>
                    <TouchableOpacity
                      onPress={() => deleteSavedCredentials(user.username)}
                    >
                      <Ionicons name="close" size={25} color={COLORS.blue1} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                )
              })}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  animatedView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
  },
  container: {
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  scrollView: {
    width: '90%',
    height: '100%',
  },
  scrollContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    backgroundColor: COLORS.secondary,
  },
  inputView: {
    width: '90%',
  },
  textInput: {
    height: 50,
    backgroundColor: COLORS.secondary,
  },
  loginBtn: {
    width: '100%',
    borderRadius: 6,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: COLORS.blue2,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  loginText: {
    marginLeft: 5,
    fontWeight: '500',
    fontSize: 17,
    color: COLORS.blue1,
  },
  loginAsContainer: {
    marginTop: 15,
    width: '100%',
  },
  loginDivider: {
    borderTopWidth: 1,
    borderColor: COLORS.gray,
    marginTop: 15,
  },
  loginDividerText: {
    top: -15,
    alignSelf: 'center',
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 10,
    fontSize: 20,
    color: COLORS.blue1,
  },
  loginAsText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: COLORS.blue1,
  },
  loginAsBtn: {
    height: 45,
    width: '90%',
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 6,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.lightBlue,
    shadowColor: COLORS.black,
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  loginAsBtnText: {
    fontSize: 18,
    color: COLORS.black,
  },
})
const {
  animatedView,
  container,
  scrollView,
  scrollContent,
  inputView,
  textInput,
  loginBtn,
  loginText,
  loginAsContainer,
  loginDivider,
  loginDividerText,
  loginAsText,
  loginAsBtn,
  loginAsBtnText,
} = styles
const mapStateToProps = (state) => {
  return {
    selectedTab: state.tabReducer.selectedTab,
    isAuthenticated: state.authReducer.isAuthenticated,
    currentUser: state.authReducer.currentUser,
  }
}
const mapDispatchToProps = (dispatch) => ({
  setAuthenticated: (val) => dispatch(authenticate(val)),
  setCurrentUser: (val) => dispatch(setCurrentUser(val)),
})
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
