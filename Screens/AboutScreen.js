import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Alert, Image, Dimensions } from 'react-native';
import { Header, Button, Body, Title, Fab, Icon, Left, Right, Item, Input, Content, Picker, Form, Container } from 'native-base';


class AboutScreen extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            latitude: '',
            longitude: '',
            vent: '',
            selected: "Natur"
        }
    }
    static navigationOptions = {
        headerTitle: 'Om SpotIT',
        headerStyle: {
            backgroundColor: 'darkslateblue'
        },
        headerTintColor: 'white'
    }
    onValueChange(value) {
        this.setState({
            selected: value
        });
    }
    updateValue(text, field) {
        this.setState({ [field]: text });
    }
    updateValue2() {
        // navigator.geolocation.getCurrentPosition(
        //     position => {
        //         this.setState({ 'latitude': position.coords.latitude });
        //         this.setState({ 'longitude': position.coords.longitude });
        //     },
        //     error => Alert.alert(error.message),
        //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        // );
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
    renderElement() {
        if (this.state.latitude != '')
            this.submit();
        else
            this.setState({ vent: 'Vent ca 10 sekunder mens vi henter din lokasjon' })
        return null;
    }
    submit() {
        let vp = {}
        vp.title = this.state.title
        vp.latitude = this.state.latitude
        vp.longitude = this.state.longitude
        vp.type = this.state.selected
        console.log(vp.longitude)
        console.log(vp.latitude)
        vp.image = this.props.navigation.getParam('photo2').base64
        fetch('https://e4b1582f.ngrok.io/postjson', {
            method: 'POST', // or 'PUT'
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vp),
        })
            .then((response) => response.json())
            .then((vp) => {
                //console.log('Success:', vp);
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
                <View style={styles.container2} >
                        <Form>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                headerStyle={{ backgroundColor: "darkslateblue" }}
                                headerBackButtonTextStyle={{ color: "#fff" }}
                                headerTitleStyle={{ color: "#fff" }}
                                selectedValue={this.state.selected}
                                onValueChange={this.onValueChange.bind(this)}
                            >
                                <Picker.Item label="Arkitektur" value="Arkitektur" />
                                <Picker.Item label="Utkikspunkt" value="Utkikspunkt" />
                                <Picker.Item label="Natur" value="Natur" />
                                <Picker.Item label="Kultur" value="Kultur" />
                                <Picker.Item label="Park" value="Park" />
                                <Picker.Item label="Annet" value="Annet" />
                            </Picker>
                        </Form>
                    </View>
                <View style={styles.container3}>
                    <Image source={{ uri: `data:image/jpeg;base64,${this.props.navigation.getParam('photo2').base64}` }} style={styles.picture} />

                </View>
                <View style={styles.container4}>
                    <Button onPress={() => this.renderElement()} rounded success>
                        <Text>  Del spotten!  </Text>
                    </Button>
                    <Text>  {this.state.vent}  </Text>
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
        padding: 30,
        paddingTop: 0
    },
    container2: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 0
    },
    container3: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container4: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    picture: {
        width: 300,
        height: 300,
        // resizeMode: 'contain',
    }
})


export default AboutScreen