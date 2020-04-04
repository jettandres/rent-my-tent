import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import SearchBar, { headerStyle } from './src/components/SearchBar'
import Home from './src/screens/Home'
import CiloSample from './src/screens/CiloSample'
import PostTent from './src/screens/PostTent'

const { Navigator, Screen } = createStackNavigator()

const App = () => (
  <NavigationContainer>
    <Navigator initialRouteName='home'>
      <Screen
        name='Home'
        component={Home}
        options={{
          headerTitleAlign: 'center',
          headerTitleContainerStyle: headerStyle,
          headerTitle: (props) => <SearchBar {...props} />,
        }}
      />
      <Screen name="CiloSample" component={CiloSample} />
      <Screen
        name="PostTent"
        component={PostTent}
        options={{
          headerTitle: 'Post your tent',
        }}
      />
    </Navigator>
  </NavigationContainer>
)

export default App
