import React from 'react';
import {TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const BackButton = ({navigation, previousScreen, params}) => {

    return (
        <TouchableOpacity
            style={{
                alignItems: 'flex-start',
            }}
            onPress={() => navigation.navigate(previousScreen, {startAt: params.startAt})}
        >
            <MaterialCommunityIcons name="keyboard-backspace" size={30} color="black"/>
        </TouchableOpacity>
    );
}

export default BackButton;
