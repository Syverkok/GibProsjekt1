import React, { Component } from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class AboutScreen extends Component{
    static navigationOptions = {
        headerTitle: 'Om SpotIT',
        headerStyle: {
          backgroundColor: 'darkslateblue'
        },
        headerTintColor: 'white'
      }
    render(){
        return(
            <View style={styles.container}>
                <Text>Hva skjer?</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

