import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput } from 'react-native';
import { Header, Button, Body, Title, Fab, Icon, Left, Right } from 'native-base';

export default class InfoScreen extends Component {
    constructor() {
        super();
        this.state = {
            photo: "",
            title: ""
        }
    }
    static navigationOptions = {
        headerTitle: 'SpotID',
        headerStyle: {
            backgroundColor: 'darkslateblue'
        },
        headerTintColor: 'white'
    }
    updateValue(text, field) {
        this.setState({ [field]: text });
    }
    loadData() {
        let vp = {}
        vp.title = this.state.title
        return fetch('https://9cf140bf.ngrok.io/getViewPoint',{
            method: 'POST', // or 'PUT'
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vp),
        }
        )
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    photo: responseJson.image,
                })
            })
            .catch((error) => console.log(error))
    }
    render() {
        return (
            <View style={styles.container}>
                <Fab direction="center" position="topLeft"
                    style={{ backgroundColor: 'darkslateblue' }} onPress={() => this.loadData()}>
                    <Icon name="ios-cloud-download" />
                </Fab>
                <TextInput
                    placeholder="Title"
                    onChangeText={(text) => this.updateValue(text, 'title')}>
                </TextInput>
                <Image style={{ width: 400, height: 400, borderRadius: 10}} source={{ uri: `data:image/jpeg;base64,${this.state.photo}` }} />
            </View>
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