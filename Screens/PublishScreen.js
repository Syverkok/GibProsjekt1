import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Alert, Image, Dimensions } from 'react-native';
import { Header, Button, Body, Title, Fab, Icon, Left, Right, Item, Input, Content, Picker, Form, Container } from 'native-base';


class PublishScreen extends Component {

    static navigationOptions = {
        headerTitle: 'Del din spot',
        headerStyle: {
            backgroundColor: '#393f4d'
        },
        headerTintColor: 'white'
    }

    //Set values to the initial state
    constructor() {
        super();
        this.state = {
            title: '',
            latitude: '',
            longitude: '',
            altitude:'',
            ventMelding: '',
            skrivInnTittel: '',
            type: 'Arkitektur',
        }
    }
    
    //Updates the value of type listed in state to the value of "value"
    onValueChange(value) {
        this.setState({
            type: value,
        });
    }

    //Adding a new value to the state with the named as "field" with the value "text"
    updateValue(text, field) {
        this.setState({ [field]: text });
    }

    //This function is called directly after the render further down has returned something. 
    //If the state is changed in this, the script re-renders with the new values listed in state.
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    altitude: position.coords.altitude

             });
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }

    //Checks if we have recieved the location of the user before submit.
    renderElement() {
        if (this.state.title == '')
            this.setState({ skrivInnTittel: 'Vennligst skriv inn tittel på spotten.' })
        else if (this.state.latitude != '')
            this.submit();
        else
            this.setState({ ventMelding: 'Oisann! Vi har ikke hentet din lokasjon enda. Prøv igjen om noen sekunder.' })
    }

    //Submit-function that posts the new spot object to the database, and then send the user back to the home map.
    submit() {
        let vp = {}
        vp.title = this.state.title
        vp.latitude = this.state.latitude
        vp.longitude = this.state.longitude
        vp.type = this.state.type
        vp.altitude = this.state.altitude
        vp.image = this.props.navigation.getParam('photo2').base64
        fetch('https://63e279dd.ngrok.io/postjson', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vp),
        })
            .then((response) => response.json())
            .then((vp) => {
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        this.props.navigation.navigate('Home');
    }

    render() {
        return (

            <View style={styles.container}>

                <View style={styles.propsfield}>
                    <View style={styles.item}>
                        <Item>
                            <Icon active name='ios-megaphone' />
                            <Input onChangeText={(text) => this.updateValue(text, 'title')} placeholder='Skriv inn navnet på spotten' />
                        </Item>
                        <Text style ={{color:'red'}}> {this.state.skrivInnTittel} </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>Vennligst velg kategori</Text>
                    </View>
                    <View style={styles.pickerfield}>
                        <Picker
                            selectedValue={this.state.type}
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) => this.setState({ type: itemValue })}
                            headerStyle={{backgroundColor: '#393f4d'}}
                            headerBackButtonTextStyle={{color: 'white'}}
                            headerTitleStyle={{color: 'white'}}
                            iosHeader="Velg type"
                            iosIcon={<Icon name="arrow-down" />}>
                            <Picker.Item label="Arkitektur" value="Arkitektur" />
                            <Picker.Item label="Utkikkspunkt" value="Utkikkspunkt" />
                            <Picker.Item label="Natur" value="Natur" />
                            <Picker.Item label="Kultur" value="Kultur" />
                            <Picker.Item label="Annet" value="Annet" />
                        </Picker>
                    </View>
                </View>

                <View style={styles.picturefield}>
                    <Image source={{ uri: `data:image/jpeg;base64,${this.props.navigation.getParam('photo2').base64}` }} style={styles.pictureprops} />
                </View>

                <View style={styles.item}>
                    <Button onPress={() => this.renderElement()} rounded info>
                        <Text>  Del spotten!  </Text>
                    </Button>
                    <Text style={{ textAlign: 'center' }}>{this.state.ventMelding}</Text>
                </View>

            </View>
        );
    }
}

//Contains propreties on each field used to style the screen visible
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    propsfield: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    picturefield: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingVertical: 20
    },
    item: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pictureprops: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pickerfield: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    picker: {
        width: '40%',
        alignItems: 'center',
    }
})

export default PublishScreen