import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Header, Item, Icon, Input, Container, Button, Body, Segment } from 'native-base'

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
            dataSource: null,
            isLoading: true,
            searchKey: '',
        }
    }

    componentDidMount() {
        return fetch('https://jsonplaceholder.typicode.com/user/1/todos/')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson,
                    isLoading: false,
                })
            })
            .catch((error) => console.log(error))
    }

    render() {

        if (this.state.isLoading) {

            return (
                <ActivityIndicator/>
            )
        }
        else {
            const filteredData = this.state.dataSource.filter( (item) => {
                return item.title.indexOf(this.state.searchKey) >= 0
            })

            let todos = filteredData.map((value, key) => {

                return (
                    <View key={key}>
                        <Text>
                            {value.title}
                        </Text>
                    </View>
                );
        });

        return (
            
            <Container>
                
                <Header searchBar rounded>
                    <Item>
                        <Icon name='search'/>
                        <Input placeholder='Search for a spot' onChangeText={ (value) => this.setState({searchKey: value}) }/>
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>

                <View style={styles.container}>
                    {todos}
                </View>

            </Container>
            
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
