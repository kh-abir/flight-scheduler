import React from 'react';
import {Text, Alert} from 'react-native';
import Animated from "react-native-reanimated";
import {COLORS} from "../constants/theme";

const AppInfoScreen = ({drawerAnimationStyle}) => {

    return (
        Alert.alert('Version', version, [{text: 'OK'}])
    );
}


export default AppInfoScreen
