import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Home = () => (
  <View style={styles.container}>
    <Text>Welcome Home! MADERPAKER</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
})

export default Home;
