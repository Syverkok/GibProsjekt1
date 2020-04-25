import React, { Component } from 'react';
import { View, StyleSheet, Image, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Header, Button, Body, Title, Fab, Icon, Left, Right, Container, Content, Picker, Form, Card, CardItem, Text } from 'native-base';

export default class FuzzyScreen extends Component {
    constructor() {
        super();
        this.state = {
            kjore: 0,
            tur: 0,
            latitude: '',
            longitude: '',
            vent: '',
            listOfViews: [],

        }
    }
    static navigationOptions = {
        headerTitle: 'SpotIT',
        headerStyle: {
            backgroundColor: '#393f4d'
        },
        headerTintColor: 'white'
    }
    setKjore(value) {
        this.setState({
            kjore: value
        });
    }
    setTur(value) {
        this.setState({
            tur: value
        });
    }
    renderElement() {
        if (this.state.latitude != '')
            this.submit();
        else
            this.setState({ vent: 'Vent ca 10 sekunder mens vi henter din lokasjon' })
        return null;
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
    submit() {
        let vp = {}
        vp.latitude = this.state.latitude
        vp.longitude = this.state.longitude
        vp.radius = this.state.kjore
        vp.distance = this.state.tur
        fetch('https://74356d21.ngrok.io/clusterViewPoints', {
            method: 'POST', // or 'PUT'
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vp),
        })
            .then((response) => response.json())
            .then((vp) => {
                console.log(vp.viewPoints)
                this.props.navigation.navigate('NewMap3', { vp:vp.viewPoints });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    render() {
        return (
            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>

                    <Card>
                        <CardItem header>
                            <Text>Finn din perftekte tur destinasjon!</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>
                                    Skulle det friste med en litta luftetur, lengre enn rundt i nabolaget? Har du tilgang på bil eller kollektiv?
                                    Da er dette funksjonaliteten for deg! Skriv inn ca lengde du er villig til å kjøre,
                                    deretter skriver du inn største avstanden du er villig til å gå!
                                    Tilbake vil du få ett sett med nydelige spots fra våre brukere! God tur!
                            </Text>
                            </Body>
                        </CardItem>
                        <CardItem footer>
                            <Text>Hilsen oss i SPOTIT AS</Text>
                        </CardItem>
                    </Card>
                    <TextInput
                        placeholder="Skriv inn ca kjøreavstand i km"
                        underlineColorAndroid='transparent'
                        style={styles.TextInputStyle}
                        keyboardType={'numeric'}
                        onChangeText={text => this.setKjore(text)}

                    />
                    <TextInput
                        placeholder="Skriv inn maksimum gå avstand"
                        underlineColorAndroid='transparent'
                        style={styles.TextInputStyle}
                        keyboardType={'numeric'}
                        onChangeText={text => this.setTur(text)}
                    />
                    <View style={styles.container4}>
                        <Button onPress={() => this.renderElement()} rounded success>
                            <Text>  Finn turområde!  </Text>
                        </Button>
                        <Text>  {this.state.vent}  </Text>
                    </View>

                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        fontWeight: "bold"
    },
    TextInputStyle: {
        textAlign: 'center',
        height: 40,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#009688',
        marginBottom: 10
    }
});