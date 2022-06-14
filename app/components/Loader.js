import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Image,
  SafeAreaView
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper'
import {COLORS} from "../constants/theme";

const Loader = ({ isLoading }) => {
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={isLoading}
      style={{ zIndex: 1100 }}
      onRequestClose={() => { }}>
      <SafeAreaView style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={isLoading} size={25} color={COLORS.black} />
          {/* If you want to image set source here */}
          {/*<Image*/}
          {/*  source={require('../assets/adaptive-icon.png')}*/}
          {/*  style={{ height: 80, width: 80 }}*/}
          {/*  resizeMode="contain"*/}
          {/*  resizeMethod="resize"*/}
          {/*/>*/}
        </View>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
    zIndex: 1000
  },
  activityIndicatorWrapper: {
    backgroundColor: COLORS.white,
    height: 40,
    width: 40,
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -20, height: 40},
    shadowOpacity: 0.6,
    shadowRadius: 20,
  },
});

export default Loader;