import React, { Component } from 'react';
import { View, StyleSheet, Image, TextInput, Keyboard, TouchableWithoutFeedback, Text } from 'react-native';
import { Header, Button, Body, Title, Fab, Icon, Left, Right, Container, Content, Picker, Form } from 'native-base';

export default class InfoScreen extends Component {
    constructor() {
        super();
        this.state = {
          };
    }
    static navigationOptions = {
        headerTitle: 'SpotID',
        headerStyle: {
            backgroundColor: 'darkslateblue'
        },
        headerTintColor: 'white'
    }
    render() {
        return (
            <Text> Brukerinfo</Text>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})