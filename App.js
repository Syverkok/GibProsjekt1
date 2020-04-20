import React from 'react';
import {Text, View, Dimensions, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AboutScreen from './Screens/AboutScreen';
import HomeScreen from './Screens/HomeScreen';
import CameraScreen from './Screens/CameraScreen';
import SearchScreen from './Screens/SearchScreen';
import SpotScreen from './Screens/SpotScreen';

const Container = createStackNavigator({
  Home: HomeScreen,
  About: AboutScreen,
  Search: SearchScreen,
  Spot: SpotScreen,
  //Camera: CameraScreen
},
{
  initialRouteName: 'Home',
});

export default createAppContainer(Container);
