import { View, Text } from 'react-native'
import React from 'react'

import { SafeAreaProvider } from 'react-native-safe-area-context'

import LoginScreen from './Component/LoginScreen'
import { NavigationContainer } from '@react-navigation/native'
import More from './Component/More'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './Component/Home'
import UserDetail from './Component/UserDetail'
import TodoList from './Component/TodoList'
import TabNav from './Component/TabNav'

const Stack = createStackNavigator();
const StackNav = ()=>{
   return (
   <NavigationContainer>
      <Stack.Navigator   screenOptions={{
            headerShown: false // Hide header for all screens
          }}>
            <Stack.Screen name = 'home' component={Home}/>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name='paging' component={UserDetail}/>
        <Stack.Screen name='todo' component={TodoList} />
        <Stack.Screen name = "main" component={TabNav}/>
        {/* Add more screens here as needed */}
      </Stack.Navigator>
    </NavigationContainer>
   )
}
const App = () => {
  return (
  
    <SafeAreaProvider>
 <StackNav/>
  </SafeAreaProvider>
      
 
  )
}

export default App