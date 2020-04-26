import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Alert, Image, Dimensions } from 'react-native';
import { Header, Button, Body, Title, Fab, Icon, Left, Right, Item, Input, Content, Picker, Form, Container } from 'native-base';


class PublishScreen extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            latitude: '',
            longitude: '',
            ventMelding: '',
            skrivInnTittel: '',
            type: 'Arkitektur',
        }
    }
    static navigationOptions = {
        headerTitle: 'Del din spot',
        headerStyle: {
            backgroundColor: '#393f4d'
        },
        headerTintColor: 'white'
    }
    onValueChange(value) {
        this.setState({
            type: value,
        });
    }
    updateValue(text, field) {
        this.setState({ [field]: text });
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({ 'latitude': position.coords.latitude });
                this.setState({ 'longitude': position.coords.longitude });
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }
    renderElement() {
        if (this.state.title == '')
            this.setState({ skrivInnTittel: 'Vennligst skriv inn tittel på spotten.' })
        else if (this.state.latitude != '')
            this.submit();
        else
            this.setState({ ventMelding: 'Oisann! Vi har ikke hentet din lokasjon enda. Prøv igjen om noen sekunder.' })
    }
    submit() {
        let vp = {}
        vp.title = this.state.title
        vp.latitude = this.state.latitude
        vp.longitude = this.state.longitude
        vp.type = this.state.type
        console.log(vp.longitude)
        console.log(vp.latitude)
        console.log(this.props.navigation.getParam('kefoijwe'))
        vp.image = this.props.navigation.getParam('photo2').base64
        fetch('https://ff4349a1.ngrok.io/postjson', {
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


            /* <View style={styles.container}>
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
                                <Picker.Item label="Utkikkspunkt" value="Utkikkspunkt" />
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
            </View> */
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //backgroundColor: 'blue',
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    propsfield: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        //backgroundColor: 'yellow'
    },
    picturefield: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'darkslateblue',
        width: '100%',
        paddingVertical: 20
    },
    item: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'yellow'
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
        //backgroundColor: 'blue',
    },
    picker: {
        //borderColor: 'black',
        //borderWidth: 2,
        width: '40%',
        alignItems: 'center',
    }
    /*container: {
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
    }*/
})

export default PublishScreen