import { Camera } from 'expo-camera';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import HomeScreen from "./components/HomeScreen";
import PredictionScreen from './components/PredictionScreen';

import {Asset} from 'expo-asset';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const [photo, setPhoto] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  let screen = <HomeScreen type={type} setPhoto={setPhoto} setCamType={setType}/>;

  if (photo != null){
    screen = <PredictionScreen photo = {photo} reset = {() => {setPhoto(null)}}/>
  }
  return (
    <View style={styles.container}>
      {screen}
    </View>
  );
  
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
