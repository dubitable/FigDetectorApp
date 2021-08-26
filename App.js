import { Camera } from 'expo-camera';
import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';

import ImageEditor from "@react-native-community/image-editor";

import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import HomeScreen from "./components/HomeScreen";
import PredictionScreen from './components/PredictionScreen';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const [photo, setPhoto] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const photoHandler = async (photo) => {
    const cropData = {
      offset: {x: 0, y: 500},
      size: {width: photo.width, height: 3000},
    }
    await ImageEditor.cropImage(photo.uri, cropData);
    setPhoto(photo);
  }

  const cacheAssetsAsync = async () => {
    Font.loadAsync({
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    }).then(()=> {
      setLoaded(true);
    })
  }

  if (!loaded){
    cacheAssetsAsync();
    return <AppLoading/>
  }
  let screen = <HomeScreen type={type} setPhoto={photoHandler} setCamType={setType}/>;

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
