import React, { useState } from 'react'
import { View, Text } from 'react-native'
import Slider from 'react-native-slider'

const PostTent = () => {
  const [sliderValue, setSliderValue] = useState(1)
  return (
    <View>
      <Text>Post a Tent maderpaker</Text>
      <Text style={{ fontSize: 16, marginTop: 24, fontWeight: 'bold' }}>Rent Duration</Text>
      <View style={{ marginTop: 24, flexDirection: 'row', justifyContent: 'space-around' }}>
        <Text style={{ fontSize: 21, fontWeight: '100', alignSelf: 'center' }}>{sliderValue} week{sliderValue > 1 ? 's' : ''}</Text>
        {/* <Text style={{ fontSize: 21, fontWeight: '100', alignSelf: 'center' }}>{displayPrice.match(/\d+/g).map(Number) * sliderValue} cUSD</Text> */}
      </View>
      <Slider
        value={sliderValue}
        onValueChange={setSliderValue}
        minimumValue={1}
        maximumValue={4}
        step={1}
        minimumTrackTintColor='#84b4c8'
      />
    </View>
  )
}

export default PostTent
