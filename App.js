import React from 'react';
import {Text, View, Dimensions, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AboutScreen from './Screens/AboutScreen';
import HomeScreen from './Screens/HomeScreen';
// import CameraScreen from './Screens/CameraScreen';

const Container = createStackNavigator({
  Home: HomeScreen,
  About: AboutScreen,
  // Camrea: CameraScreen
},
{
  initialRouteName: 'Home',
});

export default createAppContainer(Container);
