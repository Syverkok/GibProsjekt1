import React, { Component } from 'react';
import { View, StyleSheet, Image, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Header, Button, Body, Title, Fab, Icon, Left, Right, Container, Content, Picker, Form } from 'native-base';

export default class InfoScreen extends Component {
    constructor() {
        super();
        this.state = {
            photo: "",
            title: "",
            keys: "key1"

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
            keys: value
        });
    }
    loadData() {
        let vp = {}
        vp.title = this.state.title
        return fetch('https://e4b1582f.ngrok.io/getViewPoint', {
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
            //         <View
            //     style={styles.container}
            //     onPress={this.focusOff}
            //   >
            //     <TouchableWithoutFeedback style={{flex: 1, backgroundColor: 'red'}} onPress={Keyboard.dismiss} accessible={false}>

            //         <TextInput
            //           ref="numberInput"
            //           id={this.props.id}
            //           style={styles.title}
            //           keyboardType='numeric'
            //           maxLength={2}
            //           value={this.state.keys}
            //           onChange={(event) => this.onValueChange(event.nativeEvent.text)}
            //         />
            //     </TouchableWithoutFeedback>
            //   </View>
            <View
                style={styles.container}
                onPress={this.focusOff}
              >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={{ flex: 1 }}>
                <TextInput
                      ref="numberInput"
                      id={this.props.id}
                      style={styles.title}
                      keyboardType='numeric'
                      maxLength={2}
                      value={this.state.keys}
                      onChange={(event) => this.onValueChange(event.nativeEvent.text)}
                    />
                </View>
            </TouchableWithoutFeedback>
            </View>
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