import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import moment from 'moment';
import {COLORS} from "../constants/theme";

const RenderAppointmentItem = ({ item, onPress }) => {
  const appointmentStartTime = moment(item.start_at).format("h:mm a");
  const appointmentEndTime = moment(item.end_at).format("h:mm a");
  const patient = item?.patient;
  const appointment = {
    id: item.id,
    time: appointmentStartTime + ' until ' + appointmentEndTime,
    client: patient?.name,
    cc: patient?.cc,
    provider: patient?.payor,
    code: item.complete_code,
    location: item.location.informal_name,
    patientBalance: patient?.patient_balance,
    insuranceBalance: patient?.insurance_balance
  }
    const { id, time, client, code, provider, patientBalance, insuranceBalance, location } = appointment;
  const printRow = (left, right) => {
    return(
        <DataTable.Row>
          <DataTable.Cell>{left}</DataTable.Cell>
          <DataTable.Cell style={{flex: 2}}>{right}</DataTable.Cell>
        </DataTable.Row>
    )
  }
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{marginRight: 10, marginTop: 17}}>
        <View
            style={{
              backgroundColor: COLORS.transparentWhite
            }}>
          <DataTable>
            {printRow('ID', id)}
            {printRow('Time', time)}
            {printRow('Client', client)}
            {printRow('Code', code)}
            {printRow('Provider', provider)}
            {printRow('Pat. Balance', patientBalance)}
            {printRow('Ins. Balance', insuranceBalance)}
            {printRow('Location', location)}
          </DataTable>
        </View>
      </TouchableOpacity>
    );
}

export default RenderAppointmentItem;
