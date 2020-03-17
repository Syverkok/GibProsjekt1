import React from 'react';
import MapView from 'react-native-maps';
import {Text, View, Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import {Header, Button, Body, Title, Fab, Icon, Left, Right} from 'native-base';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AboutScreen from './AboutScreen';

const Drawer = createDrawerNavigator();

export default class HomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'SpotIT',
      headerLeft: () => (
        <Button transparent onPress={() => navigation.openDrawer()}>
          <Icon name ='list' style={{color: 'white'}}/>
        </Button>
      ),
      headerRight: () => (
        <Button transparent>
          <Icon name='search' style={{color: 'white'}}/>
        </Button>
      ),
      headerStyle: {
        backgroundColor: 'darkslateblue'
      },
      headerTintColor: 'white'
    }
  }
  render() {
    return (
      <SafeAreaView style={styles.headerStyle}>

        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Notifications" component={AboutScreen} />
          </Drawer.Navigator>
        </NavigationContainer>

        <MapView style={styles.mapStyle}
              initialRegion = {{
                latitude:63.428104,
                longitude:10.388036,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation>

            <MapView.Marker draggable
                coordinate= {{
                  latitude:63.428104,
                  longitude:10.388036
                }}
                title = "Skjer"/>

        </MapView>

        <Fab direction="center" position="bottomLeft"
        style={{backgroundColor: 'darkslateblue'}}>
            <Icon name="add"/>
        </Fab>

        <Fab direction="center" position="bottomRight"
        style={{backgroundColor: 'darkslateblue'}}>
            <Icon name="camera"/>
        </Fab>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create ({
  headerStyle: {
    flex: 1
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  iconStyle: {
    color: 'white'
  }
})