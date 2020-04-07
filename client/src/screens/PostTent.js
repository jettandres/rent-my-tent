import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, Picker, TouchableOpacity } from 'react-native'
import Slider from 'react-native-slider'
import { EvilIcons, FontAwesome5 } from '@expo/vector-icons'
const PostTent = () => {
  const [sliderValue, setSliderValue] = useState(1)
  const [tentDescription, setTentDescription] = useState('')
  const [tentBrand, setTentBrand] = useState('')
  const [tentBirth, setTentBirth] = useState('2');
  const [tentYear, setTentYear] = useState('')
  const [tentName, setTentName] = useState('')

  const [payEmail, setPayEmail] = useState('')
  const [payCardNumber, setPayCardNumber] = useState('')
  const [payCardExp, setPayCardExp] = useState('')
  const [payCardCvc, setPayCardCvc] = useState('')
  const [payCardName, setPayCardName] = useState('')
  const [payCountry, setPayCountry] = useState('Philippines')
  const [payPostal, setPayPostal] = useState('')

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
        
        <Text style={{ borderRadius: 4, padding: 16, backgroundColor: '#84b4c8', marginTop: 30, color: '#ffffff', fontSize: 16 }}>3. PAY $1 Membership</Text>

        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', padding: 8, backgroundColor: 'black', width: '100%', marginTop: 16, borderRadius: 8 }}>
          <FontAwesome5 name='apple-pay' size={30} color='white' />
        </TouchableOpacity>

        <View style={{ marginTop: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <View style={{ height: 1, backgroundColor: '#BDBDBD', flex: 1 }} />
          <Text style={{ marginHorizontal: 16 }}>Or pay with card</Text>
          <View style={{ height: 1, backgroundColor: '#BDBDBD', flex: 1 }} />
        </View>

        <View>
          <Text style={styles.fieldLabel}>Email</Text>
          <TextInput style={[styles.fieldInput, { elevation: 3, backgroundColor: '#ffffff' }]} placeholder='' value={payEmail} onChangeText={setPayEmail} />
        </View>
        <View>
          <Text style={styles.fieldLabel}>Card details</Text>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <TextInput style={[styles.fieldInput, { elevation: 3, flex: 2, backgroundColor: '#ffffff', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }]} placeholder='XXXX-XXXX-XXXX-XXXX' value={payCardNumber} onChangeText={setPayCardNumber} />
          </View>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <TextInput style={[styles.fieldInput, { flex: 1, elevation: 3, backgroundColor: '#ffffff', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderTopWidth: 1, borderRightWidth: 1, borderColor: '#E0E0E0' }]} placeholder='MM/YY' value={payCardExp} onChangeText={setPayCardExp} />
            <TextInput style={[styles.fieldInput, { flex: 1, elevation: 3, backgroundColor: '#ffffff', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 0, borderTopWidth: 1, borderColor: '#E0E0E0' }]} placeholder='CVC' value={payCardCvc} onChangeText={setPayCardCvc} />
          </View>
        </View>
        <View>
          <Text style={styles.fieldLabel}>Name on card</Text>
          <TextInput style={[styles.fieldInput, { elevation: 3, backgroundColor: '#ffffff' }]} placeholder='' value={payCardName} onChangeText={setPayCardName} />
        </View>
        <View>
          <Text style={styles.fieldLabel}>Country or region</Text>
          <TextInput style={[styles.fieldInput, { elevation: 3, backgroundColor: '#ffffff', borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' }]} placeholder='' value={payCountry} onChangeText={setPayCountry} />
          <TextInput style={[styles.fieldInput, { elevation: 3, backgroundColor: '#ffffff', borderTopLeftRadius: 0, borderTopRightRadius: 0 }]} placeholder='Postal Code' value={payPostal} onChangeText={setPayPostal} />
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
