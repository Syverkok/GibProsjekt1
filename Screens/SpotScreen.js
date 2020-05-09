import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Modal, ActivityIndicator, SafeAreaView } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Button } from 'native-base'

export default class SpotScreen extends Component {
    static navigationOptions = {
        headerTitle: 'SpotIT',
        headerStyle: {
            backgroundColor: '#393f4d'
        },
        headerTintColor: 'white'
    }
    //Set values to the initial state
    constructor() {
        super();
        this.state = {
            image: '',
            Max_Rating: 5,
            modalOpen: false,
            giveRating: 0,
            updated: false,
            numOfRatings: 0,
            rating: 0,
            isLoading: true,
            vp: {},
            iconName: 'question-circle'
        };
        this.Star = require('../images/Star_full.png');
        this.Star_With_Border = require('../images/Star_empty.png');
    }

    //Updates the rating listed in state to the valye "key"
    UpdateRating(key) {
        this.setState({ giveRating: key });
    }
    //Returns the number of ratings listed in state
    getNumberOfRatings() {
        return this.state.numOfRatings
    }
    //Returns the rating value listed in state
    getRating() {
        return this.state.rating
    }
    //Updates the icon name listed in state, so that each spot screen displays the correct icon to each type
    setIconName() {
        if (this.props.navigation.getParam('type') == 'Kultur') {
            this.setState({iconName: 'theater-masks'}) 
        }
        else if (this.props.navigation.getParam('type') == 'Arkitektur') {
            this.setState({iconName: 'archway'})
        }
        else if (this.props.navigation.getParam('type') == 'Utkikkspunkt') {
            this.setState({iconName: 'binoculars'})
        }
        else if (this.props.navigation.getParam('type') == 'Natur') {
            this.setState({iconName: 'tree'})
        }
        else {
            this.setState({iconName: 'question-circle'})
        }
    }
    //Updates the rating to a spot and sends this to the database. The new, updated rating is then returned and updated in state.
    async editRating(params) {

        let vp = {}
        vp.id = this.props.navigation.getParam('ID')
        vp.rating = this.state.giveRating
        return await fetch('https://a5658bf3.ngrok.io/changeRating', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vp),
        })
            .then((response) => response.json())
            .then((vp) => {
                this.setState({
                    updated: true,
                    rating: vp.rating,
                    numOfRatings: vp.numberOfRatings,
                    modalOpen: false,
                })
            })
    }
    //This function is called directly after the render further down has returned something. 
    //If the state is changed in this, the script re-renders with the new values listed in state.
    async componentDidMount() {
        let vp = {}
        vp.id = this.props.navigation.getParam('ID')
        await fetch('https://a5658bf3.ngrok.io/getViewPoint', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vp),
        })
            .then((response) => response.json())
            .then((vp) => {
                this.setState({
                    isLoading: false,
                    image: vp.image_name,
                    rating: vp.rating,
                    numOfRatings: vp.numberOfRatings,
                })
            })
            this.setIconName()
    }
    //Returns a list containing one single vp object
    getVpObject() {
        let vp = {}
        vp.lat = this.props.navigation.getParam('lat')
        vp.long = this.props.navigation.getParam('long')
        vp.title = this.props.navigation.getParam('title')
        vp.ID = this.props.navigation.getParam('ID')
        let list = [vp]
        return list
    }

    //Render function, which renders the visible screen.
    render() {
        //Returns a loading icon if the data is not ready to be displayed
        if (this.state.isLoading) {

            return (
                <ActivityIndicator />
            )
        }

        //Creating a dynamic ratingbar with stars, making it possible to change rating, and saving the rating given in state
        let Dynamic_Rating_Bar = [];
        for (var i = 1; i <= this.state.Max_Rating; i++) {
            Dynamic_Rating_Bar.push(
                <TouchableOpacity
                    activeOpacity={0.7}
                    key={i}
                    onPress={this.UpdateRating.bind(this, i)}>
                    <Image
                        style={styles.StarImage}
                        source={
                            i <= this.state.giveRating
                                ? this.Star
                                : this.Star_With_Border
                        }
                    />
                </TouchableOpacity>
            );
        }
        //Creating a static ratingbar with stars, displaying the rating of the current spot. Is not possible to change without adding a new rating.
        let Static_Rating_Bar = [];
        for (var i = 1; i <= this.state.Max_Rating; i++) {
            Static_Rating_Bar.push(
                <Image
                    style={styles.StarImage}
                    source={
                        i <= this.getRating()
                            ? this.Star
                            : this.Star_With_Border
                    }
                    key={i}
                />
            );
        }

        //When the data is loaded, this is the screen visable to the user. 
        return (
            <SafeAreaView style={styles.container}>

                {/* Creating the pop-up when adding a new rating  */}
                <Modal
                    visible={this.state.modalOpen}
                    animationType='slide'
                    transparent={true}
                >
                    <View style={styles.modalfield}>

                        <View style={styles.modalView}>

                            <Text style={{ padding: 10 }}>GI OSS DIN RATING AV SPOTTEN</Text>

                            <View>
                                <View style={styles.starview}>{Dynamic_Rating_Bar}</View>
                            </View>

                            <View style={{ padding: 10, flexDirection: 'row' }}>
                                <View style={{ padding: 10 }}>
                                    <FontAwesome.Button name="arrow-left" backgroundColor="#393f4d" onPress={() => this.setState({ modalOpen: false })}>
                                        Go back
                                    </FontAwesome.Button>
                                </View>
                                <View style={{ padding: 10 }}>
                                    <FontAwesome.Button name="star" backgroundColor="#393f4d" onPress={() => this.editRating()}
                                    >
                                        Submit
                                    </FontAwesome.Button>
                                </View>
                            </View>

                        </View>

                    </View>

                </Modal>

                <View style={styles.titlefield}>
                    <Text style={styles.titletext}>{this.props.navigation.getParam('title')}</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <FontAwesome5 name={this.state.iconName} size={32} color="#393f4d" />
                    <Text>{this.props.navigation.getParam('type')}</Text>
                </View>

                <View style={styles.reviewfield}>

                    <View style={{ padding: 10 }}>
                        <View style={styles.starview}>{Static_Rating_Bar}</View>
                        <Text>ANTALL REVIEWS: {this.getNumberOfRatings()}</Text>
                    </View>

                    <View style={{ padding: 10 }}>
                        <FontAwesome.Button name="star" backgroundColor="#393f4d" onPress={() => this.setState({ modalOpen: true, giveRating: 1 })}>
                            Legg til review
                        </FontAwesome.Button>
                    </View>

                </View>

                <View style={styles.picturefield}>
                    <Image style={styles.pictureprops} source={{ uri: `data:image/jpeg;base64,${this.state.image}` }} />
                </View>

                <View style={{ paddingBottom: 25 }}>
                    <Button onPress={() => this.props.navigation.navigate('NewMap3', { vp: this.getVpObject() })} rounded info>
                        <Text>  Se spotten på kartet </Text>
                    </Button>
                </View>



            </SafeAreaView>
        );
    }
}

//Contains propreties on each field used to style the screen visible
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    titlefield: {
        height: '16%',
        alignItems: 'center',
        //justifyContent: 'center',
        paddingTop: 10,
        paddingLeft: 5,
        paddingRight: 5
    },
    titletext: {
        fontSize: 33,
        alignItems: 'center',
        color: '#393f4d',
        borderColor: 'purple',
        paddingLeft: 0,
        paddingRight: 0,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    typefield: {
        height: '17%',
        alignItems: 'center',
        paddingTop: 0,
        paddingLeft: 5,
        paddingRight: 5
    },
    typetext: {
        fontSize: 20,
        alignItems: 'center',
        color: '#393f4d',
        borderColor: 'purple',
        paddingLeft: 5,
        paddingRight: 5,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    reviewfield: {
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    picturefield: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
    pictureprops: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center'
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
    modalfield: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
});