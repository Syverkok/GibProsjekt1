import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';

class AboutScreen extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: ''
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
        name = this.state.name
        email = this.state.email
        console.warn(name)
        const data = { username: 'example' };

        fetch('localhost:5000/postjson', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder="Name"
                    onChangeText={(text) => this.updateValue(text, 'name')}>

                </TextInput>
                <TextInput
                    placeholder="Email"
                    onChangeText={(text) => this.updateValue(text, 'email')}>

                </TextInput>
                <TouchableOpacity onPress={() => this.submit} >
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