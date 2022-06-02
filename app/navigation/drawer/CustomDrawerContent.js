import {connect, useDispatch} from "react-redux";
import {setSelectedTab} from "../../stores/tab/tabActions";
import {DrawerContentScrollView} from "@react-navigation/drawer";
import {View, Alert} from "react-native";
import {COLORS, SIZES} from "../../constants/theme";
import CustomDrawerItem from "./CustomDrawerItem";
import React from "react";
import {name, version} from '../../../package.json';
import {DRAWER_ITEMS} from "../../constants/drawerItems";
import CloseMenu from "../../components/CloseMenu";

const CustomDrawerContent = (props) => {
    const {navigation} = props
    const dispatch = useDispatch()
    return (
        <DrawerContentScrollView
            scrollEnabled={true}
            contentContainerStyle={{flex: 1}}
        >
            <View style={{flex: 1, paddingHorizontal: SIZES.radius}}>
                {/*Close Menu*/}
                <CloseMenu navigation={navigation}/>
                {/*Profile*/}
                {/*Drawer Items*/}
                <View style={{flex: 1, marginTop: SIZES.padding}}>
                    {DRAWER_ITEMS.slice(0, 7).map(({id, label, icon, screen}) =>
                        <CustomDrawerItem
                            key={id}
                            label={label}
                            icon={icon}
                            isFocused={props.selectedTab === label}
                            onPress={() => {
                                dispatch(setSelectedTab(label))
                                navigation.navigate(screen)
                            }}
                        />
                    )}

                    <View
                        style={{
                            height: 1,
                            marginVertical: 40,
                            marginLeft: SIZES.radius,
                            backgroundColor: COLORS.darkBlue
                        }}
                    />

                    {DRAWER_ITEMS.slice(7, 10).map(({id, label, icon, iconType, screen}) =>
                        <CustomDrawerItem
                            key={id}
                            label={label}
                            icon={icon}
                            iconType={iconType}
                            isFocused={props.selectedTab === label}
                            onPress={() => {
                                dispatch(setSelectedTab(label))
                                screen === 'AppInfoScreen' ?
                                    Alert.alert('App Info', `Name: ${name}\nVersion: ${version}`, [{text: 'OK'}]) :
                                    navigation.navigate(screen)
                            }}
                        />
                    )}
                </View>

                {/*Login Button*/}
                <View style={{marginBottom: SIZES.padding}}>
                    <CustomDrawerItem
                        label={'Login'}
                        icon={'login'}
                        isFocused={props.selectedTab === 'Login'}
                        onPress={() => {
                            dispatch(setSelectedTab('Login'))
                            navigation.navigate('LoginScreen')
                        }}
                    />
                </View>
            </View>
        </DrawerContentScrollView>
    )
}

const mapStateToProps = state => {
    return {
        selectedTab: state.tabReducer.selectedTab
    }
}

export default connect(mapStateToProps)(CustomDrawerContent)
