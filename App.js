import React from 'react';
import {Text, View, Dimensions, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import PublishScreen from './Screens/PublishScreen';
import HomeScreen from './Screens/HomeScreen';
import CameraScreen from './Screens/CameraScreen';
import SearchScreen from './Screens/SearchScreen';
import SpotScreen from './Screens/SpotScreen';
import InfoScreen from './Screens/InfoScreen';
import FuzzyScreen from './Screens/FuzzyScreen';
import NewMapScreen3 from './Screens/NewMapScreen3';
import FilterScreen from './Screens/FilterScreen';
import WalkScreen from './Screens/WalkScreen';
import HomeScreenCluster from './Screens/HomeScreenCluster';



global.url = 'https://f4cdd1f5.ngrok.io'

//Navigation set-up for the app, with home screen as the initial loaded one. 
const Container = createStackNavigator({
  Home: HomeScreen,
  Publish: PublishScreen,
  Spot: SpotScreen,
  Fuzzy: FuzzyScreen,
  Camera: CameraScreen,
  Walk: WalkScreen,
  Filter: FilterScreen,
  NewMap3: NewMapScreen3,
  Info:InfoScreen,
  Search: SearchScreen,
  HomeCluster: HomeScreenCluster,
},
{
  initialRouteName: 'HomeCluster',
});

export default createAppContainer(Container);
