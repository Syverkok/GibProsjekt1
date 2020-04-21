import React, { Component } from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class SpotScreen extends Component{
    static navigationOptions = {
        headerTitle: 'SpotID',
        headerStyle: {
          backgroundColor: 'darkslateblue'
        },
        headerTintColor: 'white'
    }

    render(){
        return(
            <View style={styles.container}>

                <View style={styles.spotTitle}>
                    <Text style={styles.spotTitle}>TITTEL: { this.props.navigation.getParam('title') }</Text>
                </View>

                <View style={styles.reviews}>
                    <Text>
                        Her kommer gjennomsnittlig rangering på en skala fra 0-5
                    </Text>
                </View>

                <View style={styles.body}>
                    <Text style ={{fontWeight: 'bold'}}>På et senere tidspunkt skal bildene havne her i stedet for teksten under</Text>
                    <Text>Body: { this.props.navigation.getParam('body') }</Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    spotTitle: {
        fontSize: 35,
        fontWeight: 'bold',
        flex: 1,
        justifyContent: 'center'
    }, 
    reviews: {
        flex: 1,
    },
    body: {
        flex:1,
    }
})