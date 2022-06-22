import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { DataTable } from 'react-native-paper'
import moment from 'moment'
import { COLORS } from '../constants/theme'

const RenderAppointmentItem = ({ item, onPress }) => {
  const {
    id,
    start_at_time,
    end_at_time,
    patient_name,
    location,
    service_code,
  } = item ?? {}
  const extractTime = (date) => moment(date).format('h:mm a')
  const time = `${extractTime(start_at_time)} until ${extractTime(end_at_time)}`

  const printRow = (left, right) => {
    return (
      <DataTable.Row>
        <DataTable.Cell
          textStyle={{
            color: COLORS.black,
            fontSize: 16,
            fontWeight: 'bold',
          }}
        >
          {left}
        </DataTable.Cell>
        <DataTable.Cell style={{ flex: 2, paddingLeft: 10 }}>
          {right}
        </DataTable.Cell>
      </DataTable.Row>
    )
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ marginRight: 10, marginTop: 17 }}
    >
      <View
        style={{
          backgroundColor: COLORS.white2,
        }}
      >
        <DataTable>
          {/* {printRow('ID', id)} */}
          {printRow('Time', time)}
          {printRow('Client', patient_name)}
          {printRow('Code', service_code)}
          {printRow('Location', location)}
        </DataTable>
      </View>
    </TouchableOpacity>
  )
}

export default RenderAppointmentItem
