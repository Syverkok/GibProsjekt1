import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Image } from 'react-native';
import { Icon, Input, Button, InputGroup, Content } from 'native-base';

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
            itemRating: 0,
        }
        //Filled Star. You can also give the path from local
        this.Star = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Star_full.svg/1005px-Star_full.svg.png';
        //Empty Star. You can also give the path from local
        this.Star_With_Border = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Star_empty.svg/1005px-Star_empty.svg.png';
    }

    componentDidMount() {
        return fetch('https://284b88da.ngrok.io/getViewPointInfo')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson,
                    isLoading: false,

                })
                console.log(responseJson.viewPoints.rating)

            })
            .catch((error) => console.log(error))
    }

    _renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('Spot', item)}
        }>
            <View style={styles.item}>
                <Text style={styles.text}>{item.title}</Text>
                <View style={styles.starview}>{this.makeRatingBar(item.rating)}</View>
            </View>
        </TouchableOpacity>
    );

    makeRatingBar(rating) {
        let Static_Rating_Bar = [];
        //Array to hold the filled or empty Stars
        for (var i = 1; i <= 5; i++) {
            Static_Rating_Bar.push(
                <Image
                    style={styles.StarImage}
                    source={
                        i <= rating
                            ? { uri: this.Star }
                            : { uri: this.Star_With_Border }
                    }
                    key={i}
                />
            );
        }
        return Static_Rating_Bar
    }

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
        height: '100%',
        width: '100%',
    },
    searchBar: {
        borderBottomWidth: 4,
        borderBottomColor: 'darkslateblue',
    },
    list: {
        flex: 1,
        paddingBottom: 5,
    },
    item: {
        borderBottomColor: 'darkslateblue',
        borderBottomWidth: 2,
        alignItems: 'center',
        flex: 1
    },
    text: {
        fontSize: 30,
    },
    starview: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    StarImage: {
        width: 25,
        height: 25,
        resizeMode: 'cover',
    },
})
