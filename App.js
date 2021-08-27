import { Camera } from 'expo-camera';
import React, {useState} from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';

import * as ImageManipulator from 'expo-image-manipulator';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import HomeScreen from "./screens/HomeScreen";
import PredictionScreen from './screens/PredictionScreen';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const scale = (value, photo) => {
    return (value * photo.height) / Dimensions.get("window").height;
  }
  
  const photoHandler = async (photo) => {
    const cropData = {
      originX: 0,
      originY: 1000,
      width: photo.width,
      height: photo.height - 1500
    }
    try{
      const croppedPhoto = await ImageManipulator.manipulateAsync(photo.uri, [{crop: cropData}]);
      console.log(croppedPhoto);
      setPhoto(croppedPhoto);
    }
    catch{
      photo.shape = "square"
      setPhoto(photo);
    }
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
