import React, { useState, useEffect } from 'react'
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
  const [rentalPrice, setRentalPrice] = useState(displayPrice.match(/\d+/g).map(Number) * rentEndDate.diff(rentStartDate, 'd') + 1)
  const [depositFee, setDepositFee] = useState(parseFloat(rentalPrice * 0.25).toFixed(2))
  const [totalFee, setTotalFee] = useState(parseFloat(rentalPrice + depositFee).toFixed(2))

  useEffect(() => {
    const rate = displayPrice.match(/\d+/g).map(Number)
    const dayDiff = rentEndDate.diff(rentStartDate, 'd') / 7
    setRentalPrice(parseFloat(rate * dayDiff).toFixed(2))
  }, [rentStartDate, rentEndDate, displayPrice])

  useEffect(() => {
    setDepositFee(parseFloat(rentalPrice * 0.25).toFixed(2))
  }, [rentalPrice])

  useEffect(() => {
    setTotalFee(parseFloat(parseFloat(rentalPrice) + parseFloat(depositFee)))
  }, [rentalPrice, depositFee])
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: image }} />
        <View style={styles.detailsContainer}>
          <Text style={styles.descriptionLabel}>Description</Text>
          <Text>{description}</Text>

          <View style={styles.dateRowsContainer}>
            <View style={styles.dateRowContainer}>
              <Text style={styles.dateRowLabel}>Starting Date</Text>
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
            <View style={styles.dateRowContainer}>
              <Text style={styles.dateRowLabel}>End Date</Text>
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

          <Text style={styles.summaryLabel}>Summary</Text>
          <View style={styles.summaryItemContainer}>
            <Text>Rental</Text>
            <Text>{rentalPrice} cUSD</Text>
          </View>
          <View style={[styles.summaryItemContainer, { marginTop: 8 }]}>
            <Text>Deposit fee</Text>
            <Text>{depositFee} cUSD</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryItemContainer}>
            <Text style={styles.summaryTotal}>TOTAL</Text>
            <Text style={styles.summaryTotal}>{totalFee} cUSD</Text>
          </View>

          <View style={styles.agreementContainer}>
            <Text>By renting the following tent, I hereby agree that my tent shall be automatically reposted after the indicated period to encourage reusability along with Rent-My-Tent Terms and Conditions</Text>
          </View>

          <TouchableOpacity style={styles.requestButton}>
            <Text style={styles.requestButtonLabel}>REQUEST A RENT</Text>
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
  image: {
    width: '100%',
    height: 250,
    marginBottom: 16,
    borderRadius: 2,
  },
  detailsContainer: {
    paddingHorizontal: 16,
  },
  descriptionLabel: {
    fontSize: 16,
    marginTop: 8,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dateRowsContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateRowContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  dateRowLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    marginTop: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  summaryItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryDivider: {
    marginVertical: 16,
    height: 3,
    backgroundColor: 'black',
    width: '100%',
  },
  summaryTotal: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  agreementContainer: {
    marginTop: 32,
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 6,
  },
  requestButton: {
    width: '100%',
    backgroundColor: '#84b4c8',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginTop: 16,
  },
  requestButtonLabel: {
    color: '#ffffff',
    fontSize: 16,
  },
})

export default RentTent