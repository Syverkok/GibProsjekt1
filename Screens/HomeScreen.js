import React from 'react';
import MapView from 'react-native-maps';
import { Text, View, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { Header, Button, Body, Title, Fab, Icon, Left, Right } from 'native-base';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      listOfViews: []
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'SpotIT',
      headerLeft: () => (
        <Button transparent onPress={() => navigation.navigate('About')}>
          <Icon name='list' style={{ color: 'white' }} />
        </Button>
      ),
      headerRight: () => (
        <Button transparent onPress={() => navigation.navigate('Search')}>
          <Icon name='search' style={{ color: 'white' }} />
        </Button>
      ),
      headerStyle: {
        backgroundColor: 'darkslateblue'
      },
      headerTintColor: 'white'
    }
  }

  componentDidMount() {
    return fetch('https://adfb4651.ngrok.io/viewPoints')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                listOfViews: responseJson.viewPoints,
            })
        })
        .catch((error) => console.log(error))
}
  render() {
    return (
      <SafeAreaView style={styles.headerStyle}>
        <MapView style={styles.mapStyle}
          initialRegion={{
            latitude: 63.428104,
            longitude: 10.388036,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation>
          {this.state.listOfViews.map(marker => (
            <MapView.Marker key = {marker.ID}
              coordinate={{
                latitude: marker.lat,
                longitude: marker.long
              }}
              title={marker.title}
            />
          ))}
        </MapView>
        <Fab direction="center" position="bottomLeft" style={{ backgroundColor: 'darkslateblue' }}
          onPress={() => this.props.navigation.navigate('Gallery')}>
          <Icon name="add" />
        </Fab>
        <Fab direction="center" position="bottomRight"
          style={{ backgroundColor: 'darkslateblue' }} onPress={() => this.props.navigation.navigate('Camera')}>
          <Icon name="camera" />
        </Fab>
        <Fab direction="center" position="topLeft"
          style={{ backgroundColor: 'darkslateblue' }} onPress={() => this.componentDidMount()}>
          <Icon name="ios-cloud-download" />
        </Fab>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
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