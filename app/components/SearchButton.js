import React from 'react';
import {TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
const SearchButton = ({onPress, iconName}) => {

    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <MaterialCommunityIcons name={iconName} size={30} color="black"/>
        </TouchableOpacity>
    );
}

export default SearchButton;
