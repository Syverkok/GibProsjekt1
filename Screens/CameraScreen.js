import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet , SafeAreaView } from 'react-native';
import { Camera} from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

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
    <SafeAreaView  style={styles.container}>
      <Camera style={{ flex: 1 }} type={type} >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.5,
              alignSelf: 'flex-end',
              alignItems: 'center',
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
          <TouchableOpacity
            style={{
              flex: 0.5,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Ta bilde </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </SafeAreaView >
  );
}
App.navigationOptions = {
         headerTitle: 'Legg til ny spot',
        headerStyle: {
          backgroundColor: 'darkslateblue'
        },
        headerTintColor: 'white',
    };
const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: 'darkslateblue'
    }
})