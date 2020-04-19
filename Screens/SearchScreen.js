import React, { Component } from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';

export default class SearchScreen extends Component{
    static navigationOptions = {
        headerTitle: 'Finn steder å spotte',
        headerStyle: {
          backgroundColor: 'darkslateblue'
        },
        headerTintColor: 'white'
    }

    getData() {
        fetch('https://jsonplaceholder.typicode.com/posts/1').then(response => response.json()).then(json => console.log(json))
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>Dette er søkesiden til SpotIT</Text>
                <Button title="Press me" onPress = {this.getData}/>
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
