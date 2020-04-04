import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './screens/Home'
import CiloSample from './screens/CiloSample'

const { Navigator, Screen } = createStackNavigator()

const App = () => (
  <NavigationContainer>
    <Navigator initialRouteName='home'>
      <Screen name='Home' component={Home} />
      <Screen name="CiloSample" component={CiloSample} />
    </Navigator>
  </NavigationContainer>
)

export default App
