import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Icon, Input, Button, InputGroup, Content } from 'native-base';

export default class SearchScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'SpotIT',
            headerStyle: {
                backgroundColor: '#393f4d'
            },
            headerTintColor: 'white'
        }
    }

    //Set values to the initial state
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            isLoading: true,
            searchKey: '',
            itemRating: 0,
        }
        this.Star = require('../images/Star_full.png');
        this.Star_With_Border = require('../images/Star_empty.png');
    }

    //This function is called directly after the render further down has returned something. 
    //If the state is changed in this, the script re-renders with the new values listed in state.
    componentDidMount() {
        return fetch('https://63e279dd.ngrok.io/getViewPointInfo')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson,
                    isLoading: false,

                })

            })
            .catch((error) => console.log(error))
    }
    
    //Sends you to a new map screen only if there are results matching the user search. 
    feilFix(){
        if(this.state.dataSource.viewPoints.filter(item => item.title.startsWith(this.state.searchKey)).length == 0) {
            return null;
        }
        else {
            this.props.navigation.navigate('NewMap3', { vp: this.state.dataSource.viewPoints.filter(item => 
                item.title.startsWith(this.state.searchKey)) })
        }
    }

    //Makes every spot in the search list pushable, with displayed title and rating using the rating bar.
    _renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('Spot', item)
        }
        }>
            <View style={styles.item}>
                <Text style={styles.text}>{item.title}</Text>
                <View style={styles.starview}>{this.makeRatingBar(item.rating)}</View>
            </View>
        </TouchableOpacity>
    );

    //Function making the static rating bar, which only displays the rating. This is therefore not possible to edit witout passing
    //the spot a new rating.
    makeRatingBar(rating) {
        let Static_Rating_Bar = [];
        for (var i = 1; i <= 5; i++) {
            Static_Rating_Bar.push(
                <Image
                    style={styles.StarImage}
                    source={
                        i <= rating
                            ?  this.Star 
                            :  this.Star_With_Border 
                    }
                    key={i}
                />
            );
        }
        return Static_Rating_Bar
    }

    //Render function, which renders the visible screen.
    render() {
        if (this.state.isLoading) {

            return (
                <ActivityIndicator />
            )
        }
        else {
            //Returns only the spots starting with the key in the search field.
            const filteredData = this.state.dataSource.viewPoints.filter((item) => {
                return item.title.startsWith(this.state.searchKey)
            })

            //When the data is loaded, this is the screen visable to the user. 
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
                    <Button style={{textAlign:'center', justifyContent: 'center', marginBottom: 15}} onPress={() =>
                        this.feilFix()} rounded info>
                        <Text>
                            Finn spotsa på kartet!
                        </Text>
                    </Button>

                </View>

            )
        }
    }
}

//Contains propreties on each field used to style the screen visible
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
    searchBar: {
        borderBottomWidth: 4,
        borderBottomColor: '#393f4d',
    },
    list: {
        flex: 1,
        paddingBottom: 5,
    },
    item: {
        borderBottomColor: '#393f4d',
        borderBottomWidth: 2,
        alignItems: 'center',
        flex: 1
    },
    text: {
        fontSize: 30,
        textAlign: 'center'
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
