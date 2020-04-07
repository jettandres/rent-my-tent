import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native'

import DatePicker from 'react-native-datepicker'
import moment from 'moment'

import { MaterialIcons } from '@expo/vector-icons'

import {
  requestTxSig,
  waitForSignedTxs,
  requestAccountAddress,
  waitForAccountAuth,
  FeeCurrency,
} from '@celo/dappkit'
import { toTxResult } from '@celo/contractkit/lib/utils/tx-result'

import { Linking } from 'expo'

import { web3, kit } from '../../root'
import HelloWorldContract from '../../contracts/HelloWorld.json'

const RentTent = ({ route, navigation }) => {
  const {
    tent: {
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
  const [modalVisible, setModalVisible] = useState(false)
  const [receipt, setReceipt] = useState({})

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

  const [user, setUser] = useState(null)
  useEffect(() => {
    if (user) {
      write()
    }
  }, [user, write])

  const login = useCallback(async () => {
    const requestId = 'login'
    const dappName = 'Rent My Tent'
    const callback = Linking.makeUrl('/my/path')

    requestAccountAddress({
      requestId,
      dappName,
      callback,
    })
    const dappkitResponse = await waitForAccountAuth(requestId)

    kit.defaultAccount = dappkitResponse.address
    const stableToken = await kit.contracts.getStableToken()
    const [cUSDBalanceBig, cUSDDecimals] = await Promise.all([stableToken.balanceOf(kit.defaultAccount), stableToken.decimals()])

    setUser({ cUSDBalance: cUSDBalanceBig.toString(), address: dappkitResponse.address, phoneNumber: dappkitResponse.phoneNumber })
  }, [])

  const write = useCallback(async () => {
    const networkId = await web3.eth.net.getId()
    const deployedNetwork = HelloWorldContract.networks[networkId]

    const helloWorldContract = new web3.eth.Contract(
      HelloWorldContract.abi,
      deployedNetwork && deployedNetwork.address,
      { from: null },
    )

    const {
      address,
    } = user

    const requestId = 'update_name'
    const dappName = 'Rent My Tent'
    const callback = Linking.makeUrl('/my/path')

    const txObject = await helloWorldContract.methods.setName('Hello from Rent My Tent')
    requestTxSig(
      kit,
      [
        {
          from: address,
          to: helloWorldContract.options.address,
          tx: txObject,
          feeCurrency: FeeCurrency.cUSD,
        },
      ],
      { requestId, dappName, callback },
    )

    const dappkitResponse = await waitForSignedTxs(requestId)
    const tx = dappkitResponse.rawTxs[0]
    const result = await toTxResult(kit.web3.eth.sendSignedTransaction(tx)).waitReceipt()

    console.log(`Rent My Tent contract update transcation receipt: `, result)
    setReceipt(result)
    setModalVisible(true)
  }, [user])

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Modal transparent={true} visible={modalVisible}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ height: '40%', width: '80%', backgroundColor:'#ffffff', borderRadius: 8, alignItems: 'center', padding: 8, paddingTop: 16 }}>
              <Text style={{ flex: 1, fontSize: 16, fontWeight: 'bold' }}>PAYMENT SUCCESSFUL</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                <MaterialIcons name='attach-money' size={80} color='green' />
                <Text style={{ width: 150 }}>We are informing the tent owner about your interest</Text>
              </View>
              <View style={{ flexDirection: 'column', width: '100%', justifyContent: 'flex-end' }}>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'flex-end' }} onPress={() => Linking.openURL(`https://alfajores-blockscout.celo-testnet.org/tx/${receipt.transactionHash}`)}>
                  <Text style={{ color: '#84b4c8', padding: 16, borderRadius: 4, fontWeight: 'bold' }}>VIEW TRANSACTION</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', alignItems: 'flex-end' }} onPress={() => setModalVisible(false)}>
                  <Text style={{ color: '#84b4c8', padding: 16, borderRadius: 4, fontWeight: 'bold' }}>CLOSE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        
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

          <TouchableOpacity style={styles.requestButton} onPress={login}>
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
