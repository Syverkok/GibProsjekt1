import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, ActivityIndicator } from 'react-native';

export default class SearchScreen extends Component {
    static navigationOptions = {
        headerTitle: 'Finn steder å spotte',
        headerStyle: {
            backgroundColor: 'darkslateblue'
        },
        headerTintColor: 'white'
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: null,
        }
    }

    componentDidMount() {
        return fetch('https://reactnative.dev/movies.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson,
                    isLoading: true,
                })
            })
            .catch((error) => console.log(error))
    }

    render() {

        if (this.state.isLoading) {

            return (
                <View style={styles.container}>
                    <View style={styles.container}>
                        <Text>Dette er søkesiden til SpotIT</Text>
                    </View>
                    <View style={styles.container}>
                        <Button title="Display all spots" onPress={(responseJson) => this.setState({
                            isLoading: false,
                        })} />
                    </View>
                </View>
            )
        }
        else {
            let movies = this.state.dataSource.movies.map((value, key) => {
                return (
                    <View key={key} style={styles.item}>
                        <Text> {value.title} </Text>
                    </View>
                )
            });

            return (
                <View style={styles.container}>
                    {movies}
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#bbb'
    }
})
