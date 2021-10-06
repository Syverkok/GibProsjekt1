import React from 'react';
import MapView from "react-native-map-clustering";
import {Marker} from 'react-native-maps';
import { Text, View, Dimensions, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { Header, Button, Body, Title, Fab, Icon, Left, Right } from 'native-base';

export default class NewMapScreen3 extends React.Component {

    static navigationOptions = {
        headerTitle: 'SpotIT',
        headerStyle: {
            backgroundColor: '#393f4d'
        },
        headerTintColor: 'white'
    }

    //Set values to the initial state
    constructor() {
        super();
        this.state = {
            listOfViews: [],
            latitude: '',
            longitude: ''
        }
    }
    
    render() {
        return (
            <SafeAreaView style={styles.headerStyle}>
                <MapView style={styles.mapStyle}
                    initialRegion={{
                        latitude: this.props.navigation.getParam('vp')[0].lat,
                        longitude: this.props.navigation.getParam('vp')[0].long,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    showsUserLocation
                    clusterColor={'#393f4d'}
                        >
                    {this.props.navigation.getParam('vp').map(marker => (
                        <Marker key={marker.ID}
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
            </SafeAreaView>
        );
    }
}

//Contains propreties on each field used to style the screen visible
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