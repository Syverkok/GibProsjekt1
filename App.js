import React from 'react';
import MapView from 'react-native-maps';
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
              initialRegion = {{
                latitude:63.428104,
                longitude:10.388036,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation
          >
            <MapView.Marker draggable
                coordinate= {{
                  latitude:63.428104,
                  longitude:10.388036
                }}
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
      </View>
    );
  }
}


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
