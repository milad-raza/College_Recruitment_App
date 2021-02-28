import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppNavigation from "./src/config/navigation";
import {Text,View} from 'react-native'
import Home from './src/screens/Home'

export default function App() {
  return (
   <AppNavigation />
  // <View>
  // <Text>dfd</Text>
  // </View>
  // <Home />
  );
}
