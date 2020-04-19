import React from 'react';
import MapView from 'react-native-maps';
import {Text, View, Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import {Header, Button, Body, Title, Fab, Icon, Left, Right} from 'native-base';

export default class HomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'SpotIT',
      headerLeft: () => (
        <Button transparent onPress={() => navigation.navigate('About')}>
          <Icon name ='list' style={{color: 'white'}}/>
        </Button>
      ),
      headerRight: () => (
        <Button transparent onPress={() => navigation.navigate('Search')}>
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
        <Fab direction="center" position="bottomLeft" style={{backgroundColor: 'darkslateblue'}}>
          <Icon name="add"/>
        </Fab>
        <Fab direction="center" position="bottomRight"
        style={{backgroundColor: 'darkslateblue'}} onPress={() => this.props.navigation.navigate('')}>
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