import { View, Text, Alert } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import messaging from "@react-native-firebase/messaging";
import Shedule from './Component/Shedule';
import Notify from './Component/Notify';
import Home from './Component/Home';
import LoginScreen from './Component/LoginScreen';
import UserDetail from './Component/UserDetail';
import TodoList from './Component/TodoList';
import TabNav from './Component/TabNav';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const StackNav = () => {
   return (
      <NavigationContainer>
         <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='home' component={Home}/>
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name='paging' component={UserDetail}/>
            <Stack.Screen name='todo' component={TodoList} />
            <Stack.Screen name="main" component={TabNav}/>
            {/* Add more screens here as needed */}
         </Stack.Navigator>
      </NavigationContainer>
   );
};



const App = () => {

  useEffect(() => {
    const getDeviceToken = async () => {
      try {
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        console.log('FCM token:', token);
        // Send the device token to the backend
      await AsyncStorage.setItem('device_token', token);
      } catch (error) {
        console.error('Error getting FCM token:', error);
      }
    };
    getDeviceToken();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
 

   return (
      <SafeAreaProvider>
         <StackNav/>
         {/* <TodoList/>
         <Shedule/>
         <Notify/> */}
      </SafeAreaProvider>
   );
};

export default App;
