import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Icon, Input, Button, InputGroup, Content} from 'native-base'

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
            dataSource: [],
            isLoading: true,
            searchKey: '',
        }
    }

    componentDidMount() {
        return fetch('https://9cf140bf.ngrok.io/viewPoints')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson,
                    isLoading: false,
                })
            })
            .catch((error) => console.log(error))
    }

    _renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Spot', item)}>
            <View style={styles.item}>
                <Text style={{fontSize: 25}}>{item.title}</Text>
                <Text>Rating: {item.rating}</Text>
            </View>
        </TouchableOpacity>
    );

    render() {

        if (this.state.isLoading) {

            return (
                <ActivityIndicator />
            )
        }
        else {
            const filteredData = this.state.dataSource.viewPoints.filter((item) => {
                return item.title.indexOf(this.state.searchKey) >= 0
            })

            /* let todos = filteredData.map((value, key) => {

                return (
                    <View key={key}>
                        <Text style={styles.item}>
                            {value.title}
                        </Text>
                    </View>
                );
            }); */

            return (

                <View style={styles.container}>

                    <View style={styles.searchBar}>
                        <InputGroup>
                            <Icon name='search' />
                            <Input placeholder='Search for a spot' onChangeText={(value) => this.setState({ searchKey: value })} />
                        </InputGroup>
                    </View>

                    <View style={styles.list}>
                        <FlatList
                            data={filteredData}
                            renderItem={this._renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>

                </View>

            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBar: {
        borderBottomWidth: 4,
        borderBottomColor: 'darkslateblue'
    },
    list: {
        flex: 1,
        paddingBottom: 5
    },
    item: {
        padding: 50,
        borderBottomColor: 'darkslateblue',
        borderBottomWidth: 2,
        alignItems: 'center',
    }
})
