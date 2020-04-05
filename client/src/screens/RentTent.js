import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native'

import DatePicker from 'react-native-datepicker'
import moment from 'moment'

const RentTent = ({ route, navigation }) => {
  const {
    tent: {
      name,
      user,
      description,
      displayPrice,
      image,
    },
  } = route.params
  const [rentStartDate, setRentStartDate] = useState(moment())
  const [rentEndDate, setRentEndDate] = useState(moment(rentEndDate).add(1, 'w'))
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Image style={{ width: '100%', height: 250, marginBottom: 16, borderRadius: 2 }} source={{ uri: image }} />
        <View style={{ paddingHorizontal: 16 }}>
          <Text style={{ fontSize: 16, marginTop: 8, fontWeight: 'bold', marginBottom: 4 }}>Description</Text>
          <Text>{description}</Text>

          <View style={{ marginTop: 24, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Starting Date</Text>
              <DatePicker
                style={{ width: 150 }}
                date={rentStartDate}
                mode="date"
                placeholder="select date"
                format="MMM D, YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    borderWidth: 0,
                    borderRadius: 6,
                    backgroundColor: '#f2f2f2',
                  },
                }}
                onDateChange={(_, date) => setRentStartDate(moment(date))}
              />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>End Date</Text>
              <DatePicker
                style={{ width: 150 }}
                date={rentEndDate}
                mode="date"
                placeholder="select date"
                format="MMM D, YYYY"
                minDate={moment(rentStartDate).add(1, 'w')}
                // minDate="2016-05-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    borderWidth: 0,
                    borderRadius: 6,
                    backgroundColor: '#f2f2f2',
                  },
                }}
                onDateChange={(_, date) => setRentEndDate(moment(date))}
              />
            </View>
          </View>

          <Text style={{ fontSize: 16, marginTop: 24, fontWeight: 'bold', marginBottom: 16 }}>Summary</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>Rental</Text>
            <Text>{displayPrice.match(/\d+/g).map(Number) * rentEndDate.diff(rentStartDate, 'd') + 1}.00 cUSD</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
            <Text>Deposit fee</Text>
            <Text>1.00 cUSD</Text>
          </View>

          <View style={{ marginVertical: 16, height: 3, backgroundColor: 'black', width: '100%' }} />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>TOTAL</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>86.00 cUSD</Text>
          </View>

          <View style={{ marginTop: 32, backgroundColor: '#f2f2f2', padding: 16, borderRadius: 6 }}>
            <Text>By renting the following tent, I hereby agree that my tent shall be automatically reposted to encourage reusability along with Rent-My-Tent Terms and Conditions</Text>
          </View>

          <TouchableOpacity style={{ width: '100%', backgroundColor: '#84b4c8', padding: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 4, marginTop: 16 }}>
            <Text style={{ color: '#ffffff', fontSize: 16 }}>REQUEST A RENT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingBottom: '25%',
  },
  scrollView: {
    flex: 1,
  },
})

export default RentTent
