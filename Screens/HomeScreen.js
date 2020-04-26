import React from 'react';
import MapView from 'react-native-maps';
import { Text, View, Dimensions, SafeAreaView, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Header, Button, Body, Title, Fab, Icon, Left, Right } from 'native-base';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      listOfViews: [],
      latitude: '',
      longitude: '',
      isLoading: true
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'SpotIT',
      headerLeft: () => (
        <Button transparent onPress={() => navigation.navigate('Info')}>
          <Icon name='list' style={{ color: 'white' }} />
        </Button>
      ),
      headerRight: () => (
        <Button transparent onPress={() => navigation.navigate('Search')}>
          <Icon name='search' style={{ color: 'white' }} />
        </Button>
      ),
      headerStyle: {
        backgroundColor: '#393f4d'
      },
      headerTintColor: 'white'
    }
  }
  displayLongitue() {
    if (this.state.longitude == '') {
      return 9;
    } else {
      return this.state.longitude;
    }
  }
  displayLatitude() {
    if (this.state.latitude == '') {
      return 62;
    } else {
      return this.state.latitude;
    }
  }

  async componentDidMount() {
    await navigator.geolocation.getCurrentPosition(
      position => {
          this.setState({ 
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            isLoading: false
          });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
    return await fetch('https://b9c06019.ngrok.io/getViewPointInfo')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          listOfViews: responseJson.viewPoints,
        })
      })
      .catch((error) => console.log(error))
  }
  render() {
    if (this.state.isLoading) {
      return <Text> Loading </Text>
    }
    return (
      <SafeAreaView style={styles.headerStyle}>
        <MapView style={styles.mapStyle}
          initialRegion={{
            latitude: this.displayLatitude(),
            longitude: this.displayLongitue(),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation>
          {this.state.listOfViews.map(marker => (
            <MapView.Marker key={marker.ID}
              coordinate={{
                latitude: marker.lat,
                longitude: marker.long
              }}
              title={marker.title}
              onCalloutPress={() => {
                this.props.navigation.navigate('Spot', marker)
              }}
            />
          ))}
        </MapView>
         <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#393f4d' }}
            position="bottomLeft"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="ios-apps" />
            <Button style={{ backgroundColor: '#393f4d' }}  onPress={() => this.props.navigation.navigate('Fuzzy')}>
              <Icon name="logo-model-s" />
            </Button>
            <Button style={{ backgroundColor: '#393f4d' }} onPress={() => this.props.navigation.navigate('Filter')}>
              <Icon name="md-options" />
            </Button>
          </Fab>
        <Fab direction="center" position="bottomRight"
          style={{ backgroundColor: '#393f4d' }} onPress={() => this.props.navigation.navigate('Camera')}>
          <Icon name="camera" />
        </Fab>
        <Fab direction="center" position="topLeft"
          style={{ backgroundColor: '#393f4d' }} onPress={() => this.componentDidMount()}>
          <Icon name="ios-refresh" />
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