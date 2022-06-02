import {Image, Text, TouchableOpacity} from "react-native";
import {COLORS, SIZES} from "../../constants/theme";
import React from "react";
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";

const CustomDrawerItem = ({label, icon, iconType, isFocused, onPress}) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                height: 40,
                marginBottom: SIZES.base,
                alignItems: 'center',
                paddingLeft: SIZES.radius,
                borderRadius: SIZES.base,
                backgroundColor: isFocused ? COLORS.transparentBlack1 : null
            }}
            onPress={onPress}
        >
            {label === 'Login' ?
                <AntDesign name="login" size={20} color="black"/> :
                <MaterialCommunityIcons name={icon} size={25} color="black"/>
            }
            <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 15, color: COLORS.black}}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomDrawerItem