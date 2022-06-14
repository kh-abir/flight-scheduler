import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SIZES } from '../constants/theme';
import { AntDesign } from '@expo/vector-icons';

const CloseMenu = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={{
        marginTop: SIZES.radius,
        marginLeft: SIZES.radius,
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
      onPress={() => navigation.closeDrawer()}
    >
      <AntDesign name={'menu-unfold'} size={30} color="black" />
    </TouchableOpacity>
  );
};

export default CloseMenu;
