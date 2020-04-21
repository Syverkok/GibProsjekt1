import React from 'react';
import MapView from 'react-native-maps';
import { Text, View, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { Header, Button, Body, Title, Fab, Icon, Left, Right } from 'native-base';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      listOfViews: [
        {
          "ID": 1,
          "date": null,
          "image_name": null,
          "lat": 63.419296,
          "long": 10.401807,
          "title": "Gl\u00f8shaugen"
        },
        {
          "ID": 2,
          "date": null,
          "image_name": null,
          "lat": 63.42686,
          "long": 10.410917,
          "title": "Festningen"
        },
        {
          "ID": 6,
          "date": null,
          "image_name": null,
          "lat": 59.234581,
          "long": 10.433676,
          "title": "SyverCrib"
        }
      ]
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
  fetchData() {
    fetch('https://37054af2.ngrok.io/viewPoints')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });

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
            <MapView.Marker
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
          style={{ backgroundColor: 'darkslateblue' }} onPress={() => this.fetchData()}>
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