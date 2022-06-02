import React, {useState} from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Switch,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {AntDesign, MaterialCommunityIcons, MaterialIcons, Ionicons} from '@expo/vector-icons';
import Animated from "react-native-reanimated";
import {COLORS} from "../constants/theme";

const LoginScreen = (props) => {
    const {drawerAnimationStyle} = props
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState('');

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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
            <SafeAreaView style={styles.container}>
                <ScrollView
                    style={{width: "100%"}}
                    contentContainerStyle={{alignItems: "center", justifyContent: "center", flexGrow: 1}}>

                    <Image style={styles.logo} source={require('../assets/logo-tm.png')}/>

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Email"
                            placeholderTextColor="#003f5c"
                            onChangeText={(email) => setEmail(email)}
                        />
                        <MaterialIcons style={styles.textBoxIcon} name="email" size={20} color="black"/>
                    </View>

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Password"
                            placeholderTextColor="#003f5c"
                            secureTextEntry={true}
                            onChangeText={(password) => setPassword(password)}
                        />
                        <MaterialIcons style={styles.textBoxIcon} name="lock" size={20} color="black"/>
                    </View>

                    <View style={{...styles.loginAsBtnWrap, justifyContent: "center"}}>
                        <Switch
                            trackColor={{false: "#767577", true: "#88CBF1"}}
                            thumbColor={isEnabled ? "#20679F" : "#fff"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                            style={{paddingRight: 0, marginTop: 1}}
                        />
                        <Text onPress={toggleSwitch} style={{fontWeight: "bold", paddingTop: 20}}>Remember Me</Text>

                        <TouchableOpacity style={{marginLeft: 35}}>
                            <Text style={styles.forgot_button}>Forgot Password?</Text>
                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('MainLayout')}
                        style={{ ...styles.loginBtn, marginTop: 0 }}
                    >
                        <AntDesign name="login" size={20} color="black"/>
                        <Text style={styles.loginText}>LOGIN</Text>
                    </TouchableOpacity>
                </ScrollView>


            </SafeAreaView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CDE6F9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        marginTop: 20,
        marginBottom: 10,
        height: 75,
        width: 200
    },
    inputView: {
        borderRadius: 10,
        width: "85%",
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#000",
        margin: 2,
        paddingLeft: 10,

        flexDirection: "row",
        justifyContent: "center",

    },

    textBoxIcon: {
        paddingTop: 16,
        paddingRight: 10,
    },

    TextInput: {
        height: 50,
        flex: 1,
    },

    forgot_button: {
        height: 30,
        marginBottom: 10,
        marginTop: 20,
    },

    loginBtn: {
        width: "90%",
        borderRadius: 20,
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        backgroundColor: "#88CBF1",
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: {width: 1, height: 13},
    },
    loginText: {
        marginLeft: 5,
        fontWeight: "bold"
    },
    loginAsText: {
        fontWeight: "bold",
        marginLeft: 5,
        color: "#000",
        maxWidth: 250
    },
    loginAs: {
        marginTop: 30,
        fontWeight: "bold",
        textTransform: "uppercase",
        color: "black"
    },
    loginAsBtnWrap: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 0,
        marginBottom: 10,
    },
    loginAsBtn: {
        flex: 1,
        height: 50,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "80%",
        borderRadius: 20,
        backgroundColor: "#88CBF1",
        color: "#000",
        paddingLeft: 10,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: {width: 1, height: 13},
    },
    loginAsDelBtn: {
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        width: "10%",
        marginLeft: 10,
    },
});

export default LoginScreen;
