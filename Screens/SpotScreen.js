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
                <Text>Her finner du info og reviews tilhørene ulike spots.</Text>
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