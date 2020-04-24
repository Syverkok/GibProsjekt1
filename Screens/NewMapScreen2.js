import React from 'react';
import MapView from 'react-native-maps';
import { Text, View, Dimensions, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { Header, Button, Body, Title, Fab, Icon, Left, Right } from 'native-base';

export default class NewMapScreen2 extends React.Component {
    constructor() {
        super();
        this.state = {
            listOfViews: [],
            latitude: '',
            longitude: ''
        }
    }
    static navigationOptions = {
        headerTitle: 'SpotIT',
        headerStyle: {
            backgroundColor: 'darkslateblue'
        },
        headerTintColor: 'white'
    }
    render() {
        return (
            <SafeAreaView style={styles.headerStyle}>
                <MapView style={styles.mapStyle}
                    initialRegion={{
                        latitude: this.props.navigation.getParam('vp').lat,
                        longitude: this.props.navigation.getParam('vp').long,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    showsUserLocation>
                        <MapView.Marker
                            coordinate={{
                                latitude: this.props.navigation.getParam('vp').lat,
                                longitude: this.props.navigation.getParam('vp').long
                            }}
                            title={this.props.navigation.getParam('vp').title}
                        />
                </MapView>
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