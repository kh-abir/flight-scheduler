import 'react-native-gesture-handler';
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import CustomDrawer from "./app/navigation/drawer";
import {Provider} from "react-redux";
import {SafeAreaProvider} from "react-native-safe-area-context";
import React from "react";
import LoginScreen from "./app/screens/LoginScreen";
import AppointmentForm from './app/screens/AppointmentForm';
import { store } from "./app/stores";
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createStackNavigator()
const App = () => {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <PaperProvider>
                    <NavigationContainer>
                    <Stack.Navigator
                        initialRoutename={'Home'}
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        <Stack.Screen name={'Home'} component={CustomDrawer}/>
                        <Stack.Screen name={'LoginScreen'} component={LoginScreen}/>
                    </Stack.Navigator>
                </NavigationContainer>
                </PaperProvider>
            </SafeAreaProvider>
        </Provider>
    );
}
export default App
