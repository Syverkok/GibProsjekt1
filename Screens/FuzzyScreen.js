import React, { Component } from 'react';
import { View, Text, Slider, StyleSheet, Alert } from 'react-native';
import { Picker, Icon, Button } from 'native-base';


export default class FuzzyScreen extends Component {

    static navigationOptions = {
        headerTitle: 'SpotIT',
        headerStyle: {
            backgroundColor: '#393f4d'
        },
        headerTintColor: 'white'
    }

    constructor() {
        super();
        this.state = {
            distDrive: 0,
            distWalk: 0,
            myLat: '',
            myLong: '',
            waitMsg: '',
            listOfViews: [],
            sliderValue: 0,
            type: 'Godt og blandet',
        }
    }

    setDistDrive(value) {
        this.setState({
            distDrive: value
        })
    }

    setDistWalk(value) {
        this.setState({
            distWalk: value
        })
    }

    renderElement() {
        if (this.state.myLat != '') {
            this.submit();
        }

        else {
            this.setState({
                waitMsg: 'Oisann! Vi har ikke hentet din lokasjon enda. Prøv igjen om noen sekunder.'
            })
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({ myLat: position.coords.latitude });
                this.setState({ myLong: position.coords.longitude });
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }

    submit() {
        let vp = {}
        vp.latitude = this.state.myLat
        vp.longitude = this.state.myLong
        vp.radius = this.state.distWalk
        vp.distance = this.state.distDrive
        vp.type = this.state.type
        fetch('https://b9c06019.ngrok.io/clusterViewPoints', {
            method: 'POST', // or 'PUT'
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vp),
        })
            .then((response) => response.json())
            .then((vp) => {
                if (vp.viewPoints){
                    this.props.navigation.navigate('NewMap3', { vp: vp.viewPoints });
                }
                else {
                    this.setState({
                        waitMsg: 'Det finnes desverre ingen spots som matcher dine søkekriterier. '
                    })
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.textfield}>
                    <View style={styles.item}>
                        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
                            Finn din perfekte tur-destinasjon!
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={{textAlign:'center', fontSize: 15}}>
                            Skulle det friste med ei litta luftetur noe lenger enn runden rundt nabolaget? Med sykkel, bil eller kanskje fly?
                            Da er dette funksjonaliteten for deg! Før inn maksimal lengde du er villig til å reise, og
                            deretter maksimal gåavstand mellom spotsa. Fullfør søket med å spesifisere hva slags type spot du er ute etter å utforske.
                            Du vil da få foreslått en samlig med nydelige spots fra våre brukere! God tur!
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 15}}>Hilsen oss i SpotIT</Text>
                    </View>
                </View>

                <View style={styles.sliderfield}>
                    <View style={styles.slider}>
                        <Slider
                            style={{ width: '100%' }}
                            value={this.state.distDrive}
                            onValueChange={(distDrive) => this.setState({ distDrive: distDrive })}
                            step={10}
                            maximumValue={10000}
                        />
                    </View>

                    <View style={styles.slider}>
                        <Slider
                            style={{ width: '100%' }}
                            value={this.state.distWalk}
                            onValueChange={(distWalk) => this.setState({ distWalk: distWalk })}
                            step={1}
                            maximumValue={40}
                        />
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.item}>
                            <Text style={{textAlign: 'center', fontSize: 15}}>Reiselengde: {this.state.distDrive} km</Text>
                        </View>
                        <View style={styles.item}>
                            <Text style={{textAlign: 'center', fontSize: 15}}>Gangavstand: {this.state.distWalk} km</Text>
                        </View>
                    </View>
                </View>


                <View style={styles.pickerfield}>
                    <Picker
                        selectedValue={this.state.type}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => this.setState({ type: itemValue })}
                        headerStyle={{ backgroundColor: '#393f4d' }}
                        headerBackButtonTextStyle={{ color: 'white' }}
                        headerTitleStyle={{ color: 'white' }}
                        iosHeader="Velg type"
                        iosIcon={<Icon name="arrow-down" />}>
                        <Picker.Item label="Godt og blandet" value="Godt og blandet" />
                        <Picker.Item label="Arkitektur" value="Arkitektur" />
                        <Picker.Item label="Utkikkspunkt" value="Utkikkspunkt" />
                        <Picker.Item label="Natur" value="Natur" />
                        <Picker.Item label="Kultur" value="Kultur" />
                        <Picker.Item label="Annet" value="Annet" />
                    </Picker>

                </View>

                <View style={styles.buttonfield}>
                    <Button onPress={() => this.renderElement()} rounded info>
                        <Text>  Finn turområde!  </Text>
                    </Button>
                    <Text style={{textAlign: 'center'}}>{this.state.waitMsg}</Text>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        //backgroundColor: 'black'
    },
    textfield: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'green',
        width: '100%',
        padding: 10
    },
    sliderfield: {
        flex: 2,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'yellow',
        padding: 10,
    },
    pickerfield: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        //backgroundColor: 'blue',
        padding: 10,
    },
    buttonfield: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'red',
        width: '100%',
        padding: 10,
    },
    item: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slider: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    picker: {
        flex: 1,
        //borderColor: 'black',
        //borderWidth: 2,
        width: '60%',
        //backgroundColor: 'purple',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

