import React from 'react';
import {
    View,
    SafeAreaView,
    Text
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Animated from "react-native-reanimated";
import {COLORS} from "../constants/theme";
import { useEffect } from 'react';
import { BASE_URL_APP } from '@env';
import axios from 'axios';

const NewAppointmentScreen = (props) => {
    const { navigation } = props;
    const url = `${BASE_URL_APP}/appointments/new.json`;
        axios.get(url)
            .then(response => {
            // console.log(response.data);
            navigation.navigate('AppointmentForm',
            {
                item: response.data,
                previousScreen: 'MainLayout'
            }
        )
        })
        .catch(err => err)

    return (
        <Animated.View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.secondary,
            }}
        >
            <SafeAreaView>
                <ScrollView
                    style={{width: "100%"}}
                    contentContainerStyle={{alignItems: "center", justifyContent: "center", flexGrow: 1}}>
                    {/* <View>
                        <Text style={{fontSize: 30, fontWeight: 'bold'}}>New Appointment Screen</Text>
                    </View> */}
                </ScrollView>
            </SafeAreaView>
        </Animated.View>
    )
}

export default NewAppointmentScreen