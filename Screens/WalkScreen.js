import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { Picker, Icon, Button } from 'native-base';


export default class WalkScreen extends Component {

    static navigationOptions = {
        headerTitle: 'SpotIT',
        headerStyle: {
            backgroundColor: '#393f4d'
        },
        headerTintColor: 'white'
    }

    //Set values to the initial state
    constructor() {
        super();
        this.state = {
            myLat: '',
            myLong: '',
            waitMsg: '',
            type: 'Godt og blandet',
            styrke: 'Bakker',
            rating: 0,
            altitude:''
        }
        this.Star = require('../images/Star_full.png');
        this.Star_With_Border = require('../images/Star_empty.png');
    }
    //Checks if we have recieved the location of the user before submit.
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
    //Updates the rating listed in state to the valye "key"
    UpdateRating(key) {
        this.setState({ rating: key });
    }
    //This function is called directly after the render further down has returned something. 
    //If the state is changed in this, the script re-renders with the new values listed in state.
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({ 
                    myLat: position.coords.latitude,
                    myLong: position.coords.longitude,
                    altitude: position.coords.altitude
                });
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }
    //Submit-function that posts a user-request to the database, and recieves a list of spots satisfiable for the search.
    //These spots are then displayed on a new map screen.
    submit() {
        let vp = {}
        vp.latitude = this.state.myLat
        vp.longitude = this.state.myLong
        vp.styrke = this.state.styrke
        vp.type = this.state.type
        vp.rating = this.state.rating
        vp.altitude = this.state.altitude
        fetch('https://03128985.ngrok.io/lazyWalk', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vp),
        })
            .then((response) => response.json())
            .then((vp) => {
                if (vp.viewPoints) {
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

    //Render function, which renders the visible screen.
    render() {

        //Creating a dynamic ratingbar with stars, making it possible to change rating, and saving the rating given in state
        let Dynamic_Rating_Bar = [];
        for (var i = 1; i <= 5; i++) {
            Dynamic_Rating_Bar.push(
                <TouchableOpacity
                    activeOpacity={0.7}
                    key={i}
                    onPress={this.UpdateRating.bind(this, i)}>
                    <Image
                        style={styles.StarImage}
                        source={
                            i <= this.state.rating
                                ? this.Star
                                : this.Star_With_Border
                        }
                    />
                </TouchableOpacity>
            );
        }
        return (
            <View style={styles.container}>

                <View style={styles.textfield}>
                    <View style={styles.item}>
                        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
                            Spotfinner for slappfisker!
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={{ textAlign: 'center', fontSize: 15 }}>
                            Ønsker du å slite deg ut minst mulig er dette funksjonalitet for deg!
                            Her kan du justere om lengden av turen er mest avgjørende, eller om 
                            det er bakkene du helst vil unngå!
                            Velg under hva du helst vil unngå når du skal finne din neste spot!
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15 }}>Hilsen oss i SpotIT</Text>
                    </View>
                </View>

                <View style={styles.ratingfield}>
                    <View style={styles.rating}>
                        <View style={styles.starview}>{Dynamic_Rating_Bar}</View>
                    </View>
                    <View style={styles.item}>
                        <Text style={{ textAlign: 'center', fontSize: 15 }}>Minimum rating: {this.state.rating}</Text>
                    </View>
                </View>



                <View style={styles.pickerfield}>
                    <Picker
                        selectedValue={this.state.styrke}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => this.setState({ styrke: itemValue })}
                        headerStyle={{ backgroundColor: '#393f4d' }}
                        headerBackButtonTextStyle={{ color: 'white' }}
                        headerTitleStyle={{ color: 'white' }}
                        iosHeader="Velg type"
                        iosIcon={<Icon name="arrow-down" />}>
                        <Picker.Item label="Lengde" value="Lengde" />
                        <Picker.Item label="Begge" value="Begge" />
                        <Picker.Item label="Bakker" value="Bakker" />
                    </Picker>
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
                    <Text style={{ textAlign: 'center' }}>{this.state.waitMsg}</Text>
                </View>

            </View>
        )
    }
}

//Contains propreties on each field used to style the screen visible
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    textfield: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 10
    },
    sliderfield: {
        flex: 2,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    ratingfield: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginTop: -70
    },
    pickerfield: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        padding: 10,
    },
    buttonfield: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    rating: {
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    starview: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    StarImage: {
        width: 35,
        height: 35,
        resizeMode: 'cover',
    },
    picker: {
        flex: 1,
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

