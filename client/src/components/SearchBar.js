import React, { useState } from 'react'
import {
  TextInput,
  StyleSheet,
} from 'react-native'

const SearchBar = () => {
  const [value, onChangeText] = useState('')
  return (
    <TextInput
      style={styles.textInput}
      placeholder='Search for tents'
      value={value}
      onChangeText={(text) => onChangeText(text)}
    />
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#f2f2f2',
    width: '90%',
    paddingHorizontal: 16,
    borderRadius: 6,
    height: '60%',
    justifyContent: 'center',
  },
  textInput: {
    width: '100%',
  },
})

const { header: headerStyle } = styles
export { headerStyle }

export default SearchBar
