import React from 'react';
import {Text} from 'react-native';

const AppointmentItem = ({title, subtitle}) => {
    return (
        <Text style={{fontWeight: 'bold'}}>
            {title}
            <Text style={{fontWeight: 'normal'}}>{subtitle}</Text>
        </Text>

    );
}

export default AppointmentItem;
