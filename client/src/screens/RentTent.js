import React from 'react'
import { View, Text } from 'react-native'

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
  return (
    <View>
      <Text>{image}</Text>
      <Text>{name}</Text>
      <Text>{user}</Text>
      <Text>{description}</Text>
      <Text>{displayPrice}</Text>
    </View>
  )
}

export default RentTent
