import React from 'react';
import {Text, View, Dimensions, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AboutScreen from './Screens/AboutScreen';
import HomeScreen from './Screens/HomeScreen';
import CameraScreen from './Screens/CameraScreen';
import SearchScreen from './Screens/SearchScreen';
import SpotScreen from './Screens/SpotScreen';
import InfoScreen from './Screens/InfoScreen';
import FuzzyScreen from './Screens/FuzzyScreen';
import NewMapScreen from './Screens/NewMapScreen';



global.url = 'https://f4cdd1f5.ngrok.io'
const Container = createStackNavigator({
  Home: HomeScreen,
  About: AboutScreen,
  Spot: SpotScreen,
  Fuzzy: FuzzyScreen,
  Camera: CameraScreen,
  NewMap: NewMapScreen,
  Info:InfoScreen,
  Search: SearchScreen
},
{
  initialRouteName: 'Home',
});

export default createAppContainer(Container);
