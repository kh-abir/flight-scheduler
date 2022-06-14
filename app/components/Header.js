import React from "react";
import {View, Text} from "react-native";

const Header = ({containerStyle, title, leftComponent, rightComponent}) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                ...containerStyle
            }}
        >
            {/*Left*/}
            {leftComponent}

            {/*Title*/}
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text style={{fontSize: 20, fontWeight: 'bold', left: -13}}>{title}</Text>
            </View>

            {/*Right*/}
            {rightComponent}
        </View>
    )

}
export default Header
