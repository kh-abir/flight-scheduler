import React from 'react';
import {Text} from 'react-native';
import Animated from "react-native-reanimated";
import {COLORS} from "../constants/theme";

const SettingsScreen = ({drawerAnimationStyle}) => {

    return (
        <Animated.View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.secondary,
            ...drawerAnimationStyle,
        }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Settings Screen</Text>
        </Animated.View>
    );
}


export default SettingsScreen
