import React from 'react';
import MapView from 'react-native-maps';
//import MapView from 'react-native-map-clustering'
import { Text, View, Dimensions, SafeAreaView, StyleSheet, Alert, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Header, Button, Body, Title, Fab, Icon, Left, Right, Container } from 'native-base';

export default class HomeScreen extends React.Component {

  //Initial navigation options from the home screen header
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'SpotIT',
      headerLeft: () => (
        <Button transparent onPress={() => navigation.navigate('Info')}>
          <Icon name='ios-information-circle-outline' style={{ color: 'white' }} />
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

  //Set values to the initial state
  constructor() {
    super();
    this.state = {
      listOfViews: [],
      latitude: '',
      longitude: '',
      isLoading: true,
      altitude: '',
    }
  }

  //Returns the value listed in state for the variable "longitude"
  displayLongitue() {
    if (this.state.longitude == '') {
      return 1;
    } else {
      return this.state.longitude;
    }
  }

  //Returns the value listed in state for the variable "latitude"
  displayLatitude() {
    if (this.state.latitude == '') {
      return 1;
    } else {
      return this.state.latitude;
    }
  }

  //Updates the spots on the current map. Mostly used after a publish of a spot. 
  async updateData() {
    return await fetch('https://geo-spotit.herokuapp.com/getViewPointInfo')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          listOfViews: responseJson.viewPoints,
        })
        Alert.alert('Spotsa på kartet er nå oppdatert!')
      })
      .catch((error) => console.log(error))
  }

  //Updates the values set in state for the variables "latitude", "longitude", "altitude" and "isLoading" to the user location.
  getPosition() {
    if (this.state.isLoading) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            altitude: position.coords.altitude,
            isLoading: false
          });
        },
        error => Alert.alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }
  }

  //Gets the viewpoint info from the database
  async componentDidMount() {
    this.getPosition()
    return await fetch('https://geo-spotit.herokuapp.com/getViewPointInfo')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          listOfViews: responseJson.viewPoints,
        })
      })
      .catch((error) => console.log(error))
  }

  //Displays a loading screen untill the spots are loaded from the database
  render() {
    if (this.state.isLoading) {
      return (

        <SafeAreaView style={styles.container}>

          <Image
            source={require('../images/SpotIT.png')}
            style={{ width: 200, height: 200, resizeMode: 'contain' }}
          />

          <Text style={styles.titletext}> Velkommen til SpotIT!  </Text>
          <Text style={styles.titletext2}> Laster inn applikasjonen...  </Text>
          <Text style={styles.titletext2}> Brukerguide i knappen øverst til venstre.  </Text>

        </SafeAreaView>
      );
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
          containerStyle={{}}
          style={{ backgroundColor: '#393f4d' }}
          position="bottomLeft"
          onPress={() => this.setState({ active: !this.state.active })}>
          <Icon name="ios-apps" />
          <Button style={{ backgroundColor: '#393f4d' }} onPress={() => this.props.navigation.navigate('Fuzzy', { lat: this.state.latitude, long: this.state.longitude, alt: this.state.altitude })}>
            <Icon name="logo-model-s" />
          </Button>
          <Button style={{ backgroundColor: '#393f4d' }} onPress={() => this.props.navigation.navigate('Filter', { lat: this.state.latitude, long: this.state.longitude, alt: this.state.altitude })}>
            <Icon name="md-options" />
          </Button>
          <Button style={{ backgroundColor: '#393f4d' }} onPress={() => this.props.navigation.navigate('Walk', { lat: this.state.latitude, long: this.state.longitude, alt: this.state.altitude })}>
            <Icon name="ios-walk" />
          </Button>
        </Fab>
        <Fab direction="center" position="bottomRight"
          style={{ backgroundColor: '#393f4d' }} onPress={() => this.props.navigation.navigate('Camera')}>
          <Icon name="camera" />
        </Fab>
        <Fab direction="center" position="topLeft"
          style={{ backgroundColor: '#393f4d' }} onPress={() => this.updateData()}>
          <Icon name="ios-refresh" />
        </Fab>
      </SafeAreaView>
    );
  }
}

//Contains propreties on each field used to style the screen visible
const styles = StyleSheet.create({
  headerStyle: {
    flex: 1
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  iconStyle: {
    color: 'white'
  },
  titlefield: {
    flex: 1,
    alignItems: 'center',
  },
  titletext: {
    fontSize: 30,
    alignItems: 'center',
    color: '#393f4d',
    borderColor: 'purple',
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  titletext2: {
    fontSize: 15,
    alignItems: 'center',
    color: '#393f4d',
    borderColor: 'purple',
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: 'bold',
    textAlign: 'center'
  },
})