import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, Picker } from 'react-native'
import Slider from 'react-native-slider'
import { EvilIcons } from '@expo/vector-icons'
const PostTent = () => {
  const [sliderValue, setSliderValue] = useState(1)
  const [tentDescription, setTentDescription] = useState('')
  const [tentBrand, setTentBrand] = useState('')
  const [tentBirth, setTentBirth] = useState('2');
  const [tentYear, setTentYear] = useState('')
  const [tentName, setTentName] = useState('')

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={{ borderRadius: 4, padding: 16, backgroundColor: '#84b4c8', marginBottom: 16, color: '#ffffff', fontSize: 16 }}>1. PITCH YOUR TENT</Text>

        <Text style={{ color: '#757575', fontStyle: 'italic', marginBottom: 4 }}>The last time my tent was erect it looked liked this...</Text>
        <View style={styles.image}>
          <EvilIcons name='camera' size={100} color='white' />
          <Text style={{ color: 'white' }}>Upload the most recent photos of your tent</Text>
        </View>

        <View>
          <Text style={styles.fieldLabel}>Describe your tent</Text>
          <TextInput style={styles.fieldInput} placeholder='Like a tweet, 280 characters or less' value={tentDescription} onChangeText={setTentDescription} />
        </View>

        <View>
          <Text style={styles.fieldLabel}>Brand</Text>
          <TextInput style={styles.fieldInput} placeholder='The manufacturer of your tent' value={tentBrand} onChangeText={setTentBrand} />
        </View>

        <View>
          <Text style={styles.fieldLabel}>Birth tent</Text>
          <Picker
            mode='dropdown'
            selectedValue={tentBirth}
            style={{ height: 50, width: 150, backgroundColor: '#f2f2f2', borderRadius: 6 }}
            onValueChange={(itemValue, itemIndex) => setTentBirth(itemValue)}
          >
            <Picker.Item label='1 person' value='1' />
            <Picker.Item label='2 person' value='2' />
            <Picker.Item label='3 person' value='3' />
            <Picker.Item label='4 person' value='4' />
            <Picker.Item label='5 person' value='5' />
          </Picker>
        </View>

        <View>
          <Text style={styles.fieldLabel}>Year of purchase</Text>
          <TextInput style={styles.fieldInput} placeholder='The year you bought your tent' value={tentYear} onChangeText={setTentYear} />
        </View>

        <View>
          <Text style={styles.fieldLabel}>Tent name</Text>
          <TextInput style={styles.fieldInput} placeholder='Click here to generate a random name' value={tentName} onChangeText={setTentName} />
        </View>

        <Text style={{ borderRadius: 4, padding: 16, backgroundColor: '#84b4c8', marginTop: 30, color: '#ffffff', fontSize: 16 }}>2. SET TENT PRICE</Text>
        <View style={{ marginTop: 24, flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text style={{ fontSize: 16, textAlign: 'center', alignSelf: 'center' }}>Based on the information you provided, we recommend you sell <Text style={{ fontWeight: 'bold' }}>{tentName}</Text> for <Text style={{  fontWeight: 'bold' }}>{sliderValue} cUSD</Text></Text>
        </View>
        <Slider
          value={sliderValue}
          onValueChange={setSliderValue}
          minimumValue={1}
          maximumValue={50}
          step={1}
          minimumTrackTintColor='#84b4c8'
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>1cUSD</Text>
          <Text>50cUSD</Text>
        </View>

        <Text style={styles.summaryLabel}>Summary</Text>
        <View style={styles.summaryItemContainer}>
          <Text>One-time membership fee</Text>
          <Text>{sliderValue} cUSD</Text>
        </View>

        <Text style={{ borderRadius: 4, padding: 16, backgroundColor: '#84b4c8', marginTop: 30, color: '#ffffff', fontSize: 16 }}>3. PAY $1 Membership</Text>

        <View style={styles.summaryDivider} />

        <View style={styles.summaryItemContainer}>
          <Text style={styles.summaryTotal}>TOTAL</Text>
          <Text style={styles.summaryTotal}>{sliderValue} cUSD</Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingBottom: '25%',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  image: {
    width: '100%',
    height: 250,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
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
  fieldLabel: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8
  },
  fieldInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    padding: 8
  }
})

export default PostTent
