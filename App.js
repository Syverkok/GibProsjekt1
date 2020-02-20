import React from 'react';
import MapView from 'react-native-maps';
import {Text, View, Dimensions} from 'react-native';
import {Header, Button, Body, Title, Fab, Icon, Left, Right} from 'native-base'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.headerStyle}>

        <Header>
          <Left>
            <Button transparent>
              <Icon name ="list"/>
            </Button>
          </Left>
          <Body>
            <Title>SpotIT</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="search"/>
            </Button>
          </Right>
        </Header>

        <MapView style={styles.mapStyle}
              initialRegion = {{
                latitude:63.428104,
                longitude:10.388036,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation>

            <MapView.Marker draggable
                coordinate= {{
                  latitude:63.428104,
                  longitude:10.388036
                }}
                title = "Vegard er stygg"/>

        </MapView>

        <Fab direction="center" position="bottomLeft"
        style={{backgroundColor: 'blue'}}>
            <Icon name="add"/>
        </Fab>

        <Fab direction="center" position="bottomRight"
        style={{backgroundColor: 'blue'}}>
            <Icon name="camera"/>
        </Fab>
      </View>
    );
  }
}


const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerStyle: {
    flex: 1
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
};
