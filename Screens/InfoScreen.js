import React, { Component } from 'react';
import { View, StyleSheet, Image, TextInput, Keyboard, TouchableWithoutFeedback, Text} from 'react-native';
import { Header, Button, Body, Title, Fab, Icon, Left, Right, Container, Content, Picker, Form } from 'native-base';

export default class InfoScreen extends Component {

    static navigationOptions = {
        headerTitle: 'Informasjonsside',
        headerStyle: {
            backgroundColor: '#393f4d'
        },
        headerTintColor: 'white'
    }
    
    //Set values to the initial state
    constructor() {
        super();
        this.state = {
          };
    }
    
    render() {
        return (
            <View style={styles.picturefield}>

            <Image
              style={styles.pictureprops}
              source={require('../images/InfoScreen.jpg')}
            />
            </View>
        );
    }
}

//Contains propreties on each field used to style the screen visible
const styles = StyleSheet.create({
    picturefield: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
    pictureprops: {
        width: "100%",
        height: "100%",
        resizeMode: 'contain',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
})