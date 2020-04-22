import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { Header, Button, Body, Title, Fab, Icon, Left, Right, Item, Input } from 'native-base';


class AboutScreen extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            latitude: '',
            longitude: '',
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
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.state.longitude = position.coords.longitude
                this.state.latitude = position.coords.latitude
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }
    submit() {
        let vp = {}
        vp.title = this.state.title
        vp.latitude = this.state.latitude
        vp.longitude = this.state.longitude
        console.log(this.props.navigation.getParam('photo2'))
        vp.image = this.props.navigation.getParam('photo2').base64
        fetch('https://9cf140bf.ngrok.io/postjson', {
            method: 'POST', // or 'PUT'
            headers: {
                'Accept': 'application/json',
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
        
            this.props.navigation.navigate('Home');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container} >
                <Item>
                    <Icon active name='ios-megaphone' />
                    <Input onChangeText={(text) => this.updateValue(text, 'title')} placeholder='Skriv inn navnet på spotten' />
                </Item>
                </View>
                <View style={styles.container}>
                <Image style={{ width: 400, height: 400, borderRadius: 10 }} source={{ uri: `data:image/jpeg;base64,${this.props.navigation.getParam('photo2').base64}` }} />

                </View>
                <View style={styles.container}>
                <Button onPress={() => this.submit()} rounded success>
                    <Text>  Del spotten!  </Text>
                </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
    }
})


export default AboutScreen