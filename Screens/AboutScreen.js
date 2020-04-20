import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';

class AboutScreen extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            latitude: '',
            longitude: ''
        }
    }
    static navigationOptions = {
        headerTitle: 'Om SpotIT',
        headerStyle: {
            backgroundColor: 'darkslateblue'
        },
        headerTintColor: 'white'
    }
    updateValue(text, field) {
        this.setState({ [field]: text });
    }
    submit() {

        let vp = {}
        vp.title = this.state.title
        vp.latitude = this.state.latitude
        vp.longitude = this.state.longitude
        console.warn(vp)

        fetch('https://aa6cd66a.ngrok.io/postjson', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vp),
        })
            .then((response) => response.json())
            .then((vp) => {
                console.log('Success:', vp);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder="Title"
                    onChangeText={(text) => this.updateValue(text, 'title')}>

                </TextInput>
                <TextInput
                    placeholder="Latitude"
                    onChangeText={(text) => this.updateValue(text, 'latitude')}>

                </TextInput>
                <TextInput
                    placeholder="Longitude"
                    onChangeText={(text) => this.updateValue(text, 'longitude')}>

                </TextInput>
                <TouchableOpacity onPress={() => this.submit()} >
                    <Text>
                        Submit
                    </Text>
                </TouchableOpacity>
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


export default AboutScreen