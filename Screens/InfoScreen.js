import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput } from 'react-native';
import { Header, Button, Body, Title, Fab, Icon, Left, Right , Container ,Content, Picker, Form} from 'native-base';

export default class InfoScreen extends Component {
    constructor() {
        super();
        this.state = {
            photo: "",
            title: "",
            selected: "key1"

        }
    }
    static navigationOptions = {
        headerTitle: 'SpotID',
        headerStyle: {
            backgroundColor: 'darkslateblue'
        },
        headerTintColor: 'white'
    }
    updateValue(text, field) {
        this.setState({ [field]: text });
    }
    onValueChange(value) {
        this.setState({
          selected: value
        });
      }
    loadData() {
        let vp = {}
        vp.title = this.state.title
        return fetch('https://2802f069.ngrok.io//getViewPoint',{
            method: 'POST', // or 'PUT'
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vp),
        }
        )
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    photo: responseJson.image,
                })
            })
            .catch((error) => console.log(error))
    }
    render() {
        return (
            <Container>
            <Header />
            <Content>
              <Form>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  headerStyle={{ backgroundColor: "#b95dd3" }}
                  headerBackButtonTextStyle={{ color: "#fff" }}
                  headerTitleStyle={{ color: "#fff" }}
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange.bind(this)}
                >
                  <Picker.Item label="Wallet" value="key0" />
                  <Picker.Item label="ATM Card" value="key1" />
                  <Picker.Item label="Debit Card" value="key2" />
                  <Picker.Item label="Credit Card" value="key3" />
                  <Picker.Item label="Net Banking" value="key4" />
                </Picker>
              </Form>
            </Content>
          </Container>
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