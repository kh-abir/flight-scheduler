import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-paper';
import AppointmentItem from './appointmentItem';
import moment from 'moment';

const RenderAppointmentItem = ({ item, onPress }) => {
  const appointmentStartTime = moment(item.start_at).format("h:mm a");
  const appointmentEndTime = moment(item.end_at).format("h:mm a");
  const patient = item?.patient;
  const appointment = {
    time: appointmentStartTime + ' until ' + appointmentEndTime,
    client: patient?.name,
    cc: patient?.cc,
    provider: patient?.payor,
    code: item.complete_code,
    location: item.location.informal_name,
    patientBalance: patient?.patient_balance,
    insuranceBalance: patient?.insurance_balance
  }
    const { time, client, code, provider, patientBalance, insuranceBalance, location } = appointment;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{marginRight: 10, marginTop: 17}}>
        <Card>
          <Card.Content>
            <View 
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              >
              <View
                style={{
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}>
                  <AppointmentItem item={item} title='Time  : ' subtitle={time}/>
                  <AppointmentItem item={item} title='Client : ' subtitle={client}/>
                  <AppointmentItem item={item} title='Code  : ' subtitle={code}/>
                  <AppointmentItem item={item} title='Provider : ' subtitle={provider}/>
                  <AppointmentItem item={item} title='Pat. Balance : ' subtitle={patientBalance}/>
                  <AppointmentItem item={item} title='Ins. Balance : ' subtitle={insuranceBalance}/>
                  <AppointmentItem item={item} title='Location : ' subtitle={location}/>
              </View>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
}

export default RenderAppointmentItem;