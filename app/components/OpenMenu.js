import React from 'react';
import {TouchableOpacity} from 'react-native';
import {SIZES} from "../constants/theme";
import {AntDesign} from "@expo/vector-icons";

const OpenMenu = ({navigation}) => {

    return (
        <TouchableOpacity
            style={{
                alignItems: 'flex-start',
            }}
            onPress={() => navigation.openDrawer()}
        >
            <AntDesign name={'menu-fold'} size={30} color="black"/>
        </TouchableOpacity>
    );
}


export default OpenMenu
