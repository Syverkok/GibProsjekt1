import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


export default class SpotScreen extends Component {
    static navigationOptions = {
        headerTitle: 'SpotID',
        headerStyle: {
            backgroundColor: 'darkslateblue'
        },
        headerTintColor: 'white'
    }

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
        };
        //Filled Star. You can also give the path from local
        this.Star = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Star_full.svg/1005px-Star_full.svg.png';
        //Empty Star. You can also give the path from local
        this.Star_With_Border = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Star_empty.svg/1005px-Star_empty.svg.png';
    }

    UpdateRating(key) {
        this.setState({ giveRating: key });
        //Keeping the Rating Selected in state
    }

    getNumberOfRatings(){
        if(!this.state.updated){
            return this.props.navigation.getParam('numberOfRatings')
        }
        return this.state.numOfRatings
    }

    getRating(){
        if(!this.state.updated){
            return this.props.navigation.getParam('rating')
        }
        return this.state.rating
    }

    async editRating(params) {

        let vp = {}
        vp.id = this.props.navigation.getParam('ID')
        vp.rating = this.state.giveRating
        return await fetch('https://284b88da.ngrok.io/changeRating', {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(vp),
            })
            .then( (response) => response.json() )
            .then((vp) => {
                this.setState({
                    updated: true,
                    rating: vp.rating,
                    numOfRatings: vp.numberOfRatings,
                    modalOpen: false,
                })
            })
    } 

    async componentDidMount(){
        let vp = {}
        vp.id = this.props.navigation.getParam('ID')
        console.log(vp.id)
        await fetch('https://284b88da.ngrok.io/getViewPoint', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vp),
        })
        .then( (response) => response.json())
        .then( (vp) => {
            this.setState({
                isLoading: false,
                image: vp.image_name
            })
        })
    }

    render() {
        if (this.state.isLoading) {

            return (
                <ActivityIndicator />
            )
        }

        let Dynamic_Rating_Bar = [];
        //Array to hold the filled or empty Stars
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
                                ? { uri: this.Star }
                                : { uri: this.Star_With_Border }
                        }
                    />
                </TouchableOpacity>
            );
        }

        let Static_Rating_Bar = [];
        //Array to hold the filled or empty Stars
        for (var i = 1; i <= this.state.Max_Rating; i++) {
            Static_Rating_Bar.push(
                <Image
                    style={styles.StarImage}
                    source={
                        i <= this.getRating()
                            ? { uri: this.Star }
                            : { uri: this.Star_With_Border }
                    }
                    key={i}
                />
            );
        }

        return (
            <View style={styles.container}>

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
                                    <FontAwesome.Button name="arrow-left" backgroundColor="darkslateblue" onPress={() => this.setState({ modalOpen: false })}>
                                        Go back
                                    </FontAwesome.Button>
                                </View>
                                <View style={{ padding: 10 }}>
                                    <FontAwesome.Button name="star" backgroundColor="darkslateblue" onPress={() => this.editRating()}
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

                <View style={styles.reviewfield}>

                    <View style={{ padding: 10 }}>
                        <View style={styles.starview}>{Static_Rating_Bar}</View>
                        <Text>ANTALL REVIEWS: {this.getNumberOfRatings()}</Text>
                    </View>

                    <View style={{ padding: 10 }}>
                        <FontAwesome.Button name="star" backgroundColor="darkslateblue" onPress={() => this.setState({ modalOpen: true, giveRating: 0 })}>
                            Add review
                        </FontAwesome.Button>
                    </View>

                </View>

                <View style={styles.picturefield}>
                    <Image style={styles.pictureprops} source={{ uri: `data:image/jpeg;base64,${this.state.image}` }}/>
                    {/* <Image style={styles.pictureprops} source={{uri: this.props.navigation.getParam('url')}}></Image> */}
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    titlefield: {
        height: '17%',
        alignItems: 'center',
        paddingTop: 10,
        paddingLeft: 5,
        paddingRight: 5
    },
    titletext: {
        fontSize: 28,
        alignItems: 'center',
        color: 'white',
        borderColor: 'purple',
        borderWidth: 4,
        paddingLeft: 5,
        paddingRight: 5,
        fontWeight: 'bold',
        backgroundColor: 'darkslateblue',
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
        justifyContent: 'center'
    },
    pictureprops: {
        width: 300,
        height: 300,
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