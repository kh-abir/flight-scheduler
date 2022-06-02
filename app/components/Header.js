import React from "react";
import {View, Text} from "react-native";

const Header = ({containerStyle, title, leftComponent}) => {
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
                <Text>{title}</Text>
            </View>

            {/*Right*/}
        </View>
    )

}
export default Header