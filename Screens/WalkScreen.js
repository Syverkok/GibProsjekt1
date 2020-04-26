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

    constructor() {
        super();
        this.state = {
            myLat: '',
            myLong: '',
            waitMsg: '',
            type: 'Godt og blandet',
            styrke: 'Medium',
            rating: 0,
            altitude:''
        }
        this.Star = require('../images/Star_full.png');
        this.Star_With_Border = require('../images/Star_empty.png');
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
    UpdateRating(key) {
        this.setState({ rating: key });
        //Keeping the Rating Selected in state
    }

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

    submit() {
        let vp = {}
        vp.latitude = this.state.myLat
        vp.longitude = this.state.myLong
        vp.styrke = this.state.styrke
        vp.type = this.state.type
        vp.rating = this.state.rating
        vp.altitude = this.state.altitude
        fetch('https://ff4349a1.ngrok.io/lazyWalk', {
            method: 'POST', // or 'PUT'
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

    render() {

        let Dynamic_Rating_Bar = [];
        //Array to hold the filled or empty Stars
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
                            Finn spotten for deg!
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={{ textAlign: 'center', fontSize: 15 }}>
                            Ønsker du å slite deg ut minst mulig er dette funksjonalitet for deg!
                            Her veies lengde av turen opp mot høydeforskjell etter eget ønske.
                            Velg "Lett" hvis du hater bakker. Dersom kort turlengde er viktigst velg "Hard"
                            Tilbake vil du få den perfekte sptten for deg! God tur!
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
                        <Picker.Item label="Lett" value="Lett" />
                        <Picker.Item label="Medium" value="Medium" />
                        <Picker.Item label="Hard" value="Hard" />
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
    ratingfield: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'blue',
        padding: 10,
        marginTop: -70
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
        //borderColor: 'black',
        //borderWidth: 2,
        width: '60%',
        //backgroundColor: 'purple',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

