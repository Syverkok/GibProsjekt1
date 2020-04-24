import React, { useState, useEffect, useRef, } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';
import { Header, Button, Body, Title, Fab, Icon, Left, Right } from 'native-base';

export default function App({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo2, setPhoto2] = useState(null)


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Camera style={{ flex: 1 }} type={type} ref={ref => {
        setCameraRef(ref);
      }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'flex-end'
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end'
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignSelf: 'center' }} onPress={async () => {
            if (cameraRef) {
              let photo2 = await cameraRef.takePictureAsync({ base64: true, quality: 0.05 });
              setPhoto2(photo2);
              navigation.navigate('Publish', {photo2});
            }
          }}>
            <View style={{
              borderWidth: 2,
              borderRadius: 50,
              borderColor: 'white',
              height: 50,
              width: 50,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            >
              <View style={{
                borderWidth: 2,
                borderRadius: 50,
                borderColor: 'white',
                height: 40,
                width: 40,
                backgroundColor: 'white'
              }} >
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </SafeAreaView>
  );
}
App.navigationOptions = {
  headerTitle: 'Legg til ny spot',
  headerStyle: {
    backgroundColor: 'darkslateblue'
  },
  headerTintColor: 'white',
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkslateblue'
  }
})