import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'

const Home = () => (
  <View style={styles.container}>
    <Text>Welcome Home! MADERPAKER</Text>
    <TouchableOpacity style={styles.fab}>
      <AntDesign name='plus' size={30} color='white' />
    </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Home
