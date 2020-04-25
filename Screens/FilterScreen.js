import React, { Component } from 'react';
import { View, StyleSheet, Image, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Header, Button, Body, Title, Fab, Icon, Left, Right, Container, Content, Picker, Form, Card, CardItem, Text } from 'native-base';

export default class FilterScreen extends Component {
    constructor() {
        super();
        this.state = {
            avstand: 0,
            rating: 0,
            latitude: '',
            longitude: '',
            vent: '',
            listOfViews: [],

        }
    }
    static navigationOptions = {
        headerTitle: 'SpotIT',
        headerStyle: {
            backgroundColor: 'darkslateblue'
        },
        headerTintColor: 'white'
    }
    setAvstand(value) {
        this.setState({
            avstand: value
        });
    }
    setRating(value) {
        this.setState({
            rating: value
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
        vp.avstand = this.state.avstand
        vp.rating = this.state.rating
        fetch('https://867e010e.ngrok.io/getWalk', {
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
                this.props.navigation.navigate('NewMap', { vp });
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
                            <Text>Filtrer spots på avstand og rating!</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text>
                                Ønsker du utelukkende spots med høy kvalitet? Eller vil du se spots innenfor en viss avstand?
                                Denne funksjonaliteten gir deg begge og vel så det! Hvem trenger å lete etter pokemon når man kan
                                lete etter spots i nabolaget! God Tur!
                            </Text>
                            </Body>
                        </CardItem>
                        <CardItem footer>
                            <Text>Hilsen oss i SPOTIT AS</Text>
                        </CardItem>
                    </Card>
                    <TextInput
                        placeholder="Skriv største avstand i km"
                        underlineColorAndroid='transparent'
                        style={styles.TextInputStyle}
                        keyboardType={'numeric'}
                        onChangeText={text => this.setAvstand(text)}

                    />
                    <TextInput
                        placeholder="Skriv inn minimum rating"
                        underlineColorAndroid='transparent'
                        style={styles.TextInputStyle}
                        keyboardType={'numeric'}
                        onChangeText={text => this.setRating(text)}
                    />
                    <View style={styles.container4}>
                        <Button onPress={() => this.renderElement()} rounded success>
                            <Text>  Se spots!  </Text>
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