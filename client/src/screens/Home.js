import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Home = () => (
  <View style={styles.container}>
    <Text>Welcome Home! MADERPAKER</Text>
    <View style={styles.fab} />
  </View>
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    backgroundColor: '#84b4c8',
    height: 60,
    width: 60,
    borderRadius: 30,
  },
})

export default Home
