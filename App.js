import React from 'react';
import MapView from 'react-native-maps';
<<<<<<< HEAD
import { StyleSheet, Text, View, Dimensions, Button, TextInput, TouchableWithoutFeedback , TouchableOpacity, Image } from 'react-native';
export default class App extends React.Component {
  render() {
    return (
      <View style = {styles.container}>
        <View style={styles.container2}>
            <Text style = {styles.header}> SPOTIT </Text>
        </View>
        <View style={styles.container}>
          <MapView style={styles.mapStyle}
=======
import {Text, View, Dimensions} from 'react-native';
import {Header, Button, Body, Title, Fab, Icon, Left, Right} from 'native-base'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.headerStyle}>

        <Header>
          <Left>
            <Button transparent>
              <Icon name ="list"/>
            </Button>
          </Left>
          <Body>
            <Title>SpotIT</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="search"/>
            </Button>
          </Right>
        </Header>

        <MapView style={styles.mapStyle}
>>>>>>> dev
              initialRegion = {{
                latitude:63.428104,
                longitude:10.388036,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
<<<<<<< HEAD
              showsUserLocation
          >
=======
              showsUserLocation>

>>>>>>> dev
            <MapView.Marker draggable
                coordinate= {{
                  latitude:63.428104,
                  longitude:10.388036
                }}
<<<<<<< HEAD
                title = "Skjer"
            />
            <TouchableWithoutFeedback  onPress={() => alert('Do something!')}>
              <Image
                style={styles.logo}
                source={require('./myButton.png')}
              />
           </TouchableWithoutFeedback >

          </MapView>

        </View>
=======
                title = "Skjer"/>

        </MapView>

        <Fab direction="center" position="bottomLeft"
        style={{backgroundColor: 'blue'}}>
            <Icon name="add"/>
        </Fab>

        <Fab direction="center" position="bottomRight"
        style={{backgroundColor: 'blue'}}>
            <Icon name="camera"/>
        </Fab>
>>>>>>> dev
      </View>
    );
  }
}


<<<<<<< HEAD
const styles = StyleSheet.create({
  logo: {
   height: 70,
   width: 70,
   position: 'absolute',
   bottom: 2,
   right: 145

 },
  submitButton: {
    position: 'absolute',
    bottom:0,
    left:0,
    color: 'red'
},
  container: {
    flex: 4,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  header: {
    fontFamily: 'Baskerville-Bold',
    fontSize: 50,
    top: -30,
  },

});
=======
const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerStyle: {
    flex: 1
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
};
>>>>>>> dev
