import { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import Animated from 'react-native-reanimated'
import { View, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useIsDrawerOpen } from '@react-navigation/drawer'

import Header from '../components/Header'
import OpenMenu from '../components/OpenMenu'
import TabButtons from '../navigation/bottomTabs'
import { COLORS, SIZES } from '../constants/theme'
import { DRAWER_ITEMS } from '../constants/drawerItems'
import CalendarAgenda from '../components/calenderAgenda'
import { setSelectedTab } from '../stores/tab/tabActions'

const MainLayout = (props) => {
  const { selectedTab, navigation, drawerAnimationStyle } = props
  const isOpen = useIsDrawerOpen()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSelectedTab('Home'))
  }, [])

  return (
    <Animated.View style={[animatedView, drawerAnimationStyle]}>
      <Header
        containerStyle={header}
        title={selectedTab}
        leftComponent={isOpen ? null : <OpenMenu navigation={navigation} />}
      />
      <CalendarAgenda {...props} />
      {/*Footer*/}
      <View style={footer}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 4 }}
          colors={[COLORS.transparent, COLORS.lightGray1]}
          style={footerShadow}
        />
        {/*Tabs*/}
        <View style={tabContainer}>
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
            />
          ))}
        </View>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  animatedView: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  header: {
    height: 50,
    paddingHorizontal: SIZES.padding,
    marginTop: 40,
    alignItems: 'center',
  },
  footer: {
    height: 100,
    justifyContent: 'flex-end',
  },
  footerShadow: {
    position: 'absolute',
    top: -20,
    left: 0,
    right: 0,
    height: 100,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  tabContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: SIZES.radius,
    paddingBottom: 10,
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
  },
})
const { animatedView, header, footer, footerShadow, tabContainer } = styles
const mapStateToProps = (state) => {
  return {
    selectedTab: state.tabReducer.selectedTab,
  }
}

export default connect(mapStateToProps)(MainLayout)
