import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native'

import { DatePicker } from 'native-base'
import Slider from 'react-native-slider'

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
  const [sliderValue, setSliderValue] = useState(1)
  const [rentDate, setRentDate] = useState(new Date())
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Image style={{ width: '100%', height: 250, marginBottom: 16, borderRadius: 2 }} source={{ uri: image }} />
        <View style={{ paddingHorizontal: 16 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{name}</Text>
          <Text style={{ fontSize: 16, color: '#84b4c8' }}>{user}</Text>

          <Text style={{ fontSize: 16, marginTop: 24, fontWeight: 'bold' }}>Description</Text>
          <Text>{description}</Text>

          <Text style={{ fontSize: 16, marginTop: 24, fontWeight: 'bold' }}>Rent Duration</Text>
          <View style={{ marginTop: 24, flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text style={{ fontSize: 21, fontWeight: '100', alignSelf: 'center' }}>{sliderValue} week{sliderValue > 1 ? 's' : ''}</Text>
            <Text style={{ fontSize: 21, fontWeight: '100', alignSelf: 'center' }}>{displayPrice.match(/\d+/g).map(Number) * sliderValue} cUSD</Text>
          </View>
          <Slider
            value={sliderValue}
            onValueChange={setSliderValue}
            minimumValue={1}
            maximumValue={4}
            step={1}
            minimumTrackTintColor='#84b4c8'
          />

          <Text style={{ fontSize: 16, marginTop: 24, fontWeight: 'bold' }}>Starting Date</Text>
          <DatePicker
            defaultDate={new Date()}
            minimumDate={new Date()}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType='fade'
            androidMode='calendar'
            placeHolderText='Select date'
            textStyle={{ color: 'green' }}
            placeHolderTextStyle={{ color: '#d3d3d3' }}
            disabled={false}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingBottom: '80%',
  },
  scrollView: {
    flex: 1,
  },
})

export default RentTent
