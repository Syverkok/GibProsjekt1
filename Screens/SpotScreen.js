import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Container } from 'native-base';

export default class SpotScreen extends Component {
    static navigationOptions = {
        headerTitle: 'SpotID',
        headerStyle: {
            backgroundColor: 'darkslateblue'
        },
        headerTintColor: 'white'
    }

    render() {
        return (
            <ScrollView>
                <Container style={styles.container}>

                    <View style={styles.reviews}>
                        <Text style={styles.title}>TITTEL: {this.props.navigation.getParam('title')}</Text>
                    </View>

                    <View style={styles.reviews}>
                        <Text>
                            Her kommer gjennomsnittlig rangering på en skala fra 0-5
                    </Text>
                    </View>

                    <View style={styles.body}>
                        <Text style={{ fontWeight: 'bold' }}>På et senere tidspunkt skal bildene havne her i stedet for teksten under</Text>
                        <Image source={{ uri: `data:image/jpeg;base64,${this.props.navigation.getParam('image_name')}` }} style={styles.picture} />
                    </View>

                </Container>
            </ScrollView>
        );
    }





}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center'
    },
    reviews: {
    },
    body: {
        flex: 1,
        alignItems: 'center'
    },
    picture: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    }
})