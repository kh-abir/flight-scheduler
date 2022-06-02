import {Image, Text, TouchableWithoutFeedback, View} from "react-native";
import {COLORS, SIZES} from "../../constants/theme";
import React from "react";
import Animated from "react-native-reanimated";
import {MaterialCommunityIcons} from "@expo/vector-icons";
const TabButtons = ({label, icon, isFocused, onPress}) => {
    return (
        <TouchableWithoutFeedback
            onPress={onPress}
        >
            <Animated.View
                style={[
                    {
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    },

                ]}
            >
                <Animated.View
                    style={[
                        {
                            flexDirection: 'row',
                            width: '100%',
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 25,
                            backgroundColor: isFocused ? COLORS.primary : null
                        },

                    ]}
                >
                    <MaterialCommunityIcons name={icon} size={25} color="black"/>
                    {/*{isFocused &&*/}
                    {/*<Text*/}
                    {/*    numberOfLines={1}*/}
                    {/*    style={{*/}
                    {/*        marginLeft: SIZES.base,*/}
                    {/*        color: COLORS.black*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    {label}*/}
                    {/*</Text>*/}
                    {/*}*/}
                </Animated.View>
            </Animated.View>

        </TouchableWithoutFeedback>
    )
}

export default TabButtons