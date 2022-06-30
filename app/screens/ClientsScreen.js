import React, { useEffect, useState } from 'react'
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  Platform,
} from 'react-native'
import { DataTable } from 'react-native-paper'
import Animated from 'react-native-reanimated'
import { COLORS, SIZES } from '../constants/theme'
import Header from '../components/Header'
import BackButton from '../components/BackButton'
import SearchInput from '../components/SearchInput'
import moment from 'moment'
import { BASE_URL_APP } from '@env'
import axios from 'axios'
import Loader from '../components/Loader'
import { connect } from 'react-redux'

const ClientsScreen = (props) => {
  const { navigation, route, drawerAnimationStyle, currentUser } = props
  const [patients, setPatients] = useState([])
  const [items, setItems] = useState(patients)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const url = `/patients.json`
    axios
      .get(url)
      .then((response) => {
        setPatients(response.data['patients'])
        setItems(response.data['patients'])
        setLoading(false)
      })
      .catch((err) => err)
  }, [])
  const formatDate = (date) => moment(date).format('MMM d, YYYY')
  const [searchValue, setSearchValue] = useState('')
  const handleSearch = (query) => {
    setSearchValue(query)
    const newItems = patients.filter((item) => {
      return (
        item['name'].toLowerCase().indexOf(query.toString().toLowerCase()) > -1
      )
    })
    setItems(newItems)
  }

  const handleRowPress = (patientID) => {
    patientForm('edit', patientID)
  }
  const patientForm = (mode, patientID = null) => {
    let url = null
    if (mode === 'new') {
      url = `/patients/new.json`
    } else {
      url = `/patients/${patientID}.json`
    }
    axios
      .get(url)
      .then((response) => {
        navigation.navigate('ClientForm', {
          item: response.data,
          previousScreen: route.name,
        })
      })
      .catch((err) => err)
  }
  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: COLORS.secondary,
        ...drawerAnimationStyle,
      }}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <Header
          containerStyle={{
            height: 50,
            paddingHorizontal: SIZES.padding,
            alignItems: 'center',
          }}
          title={'Clients'}
          leftComponent={<BackButton navigation={navigation} />}
        />
        <SearchInput
          label={'Search by Name'}
          value={searchValue}
          onChange={(text) => handleSearch(text)}
        />
        <DataTable style={styles.tableContainer}>
          <DataTable.Header>
            <DataTable.Title textStyle={styles.title}>ID</DataTable.Title>
            <DataTable.Title textStyle={styles.title}>Name</DataTable.Title>
            <DataTable.Title textStyle={styles.title}>DOB</DataTable.Title>
          </DataTable.Header>
          <Loader isLoading={loading} />
          <ScrollView
            contentContainerStyle={{
              paddingBottom: Platform.OS === 'ios' ? 150 : 10,
            }}
          >
            {items.map((patient) => (
              <DataTable.Row
                key={patient.id}
                onPress={() => handleRowPress(patient.id)}
              >
                <DataTable.Cell>{patient.patient_number}</DataTable.Cell>
                <DataTable.Cell style={styles.nameCell}>
                  {patient.name}
                </DataTable.Cell>
                <DataTable.Cell>{patient.date_of_birth}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </ScrollView>
        </DataTable>
      </SafeAreaView>
    </Animated.View>
  )
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    currentUser: state.authReducer.currentUser,
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : 50,
    backgroundColor: COLORS.secondary,
  },
  tableContainer: {
    paddingLeft: 15,
    backgroundColor: COLORS.secondary,
  },
  nameCell: {
    paddingRight: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  indicator: {
    marginVertical: 10,
  },
})

export default connect(mapStateToProps)(ClientsScreen)
