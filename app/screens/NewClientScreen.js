import React from 'react';
import {
    View,
    SafeAreaView,
    Text
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Animated from "react-native-reanimated";
import {COLORS} from "../constants/theme";

const NewClientScreen = ({drawerAnimationStyle}) => {
    return (
        <Animated.View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.secondary,
                ...drawerAnimationStyle
            }}
        >
            <SafeAreaView>
                <ScrollView
                    style={{width: "100%"}}
                    contentContainerStyle={{alignItems: "center", justifyContent: "center", flexGrow: 1}}>
                    <View>
                        <Text style={{fontSize: 30, fontWeight: 'bold'}}>New Client Screen</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Animated.View>
    )
}

export default NewClientScreen