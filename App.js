import { Camera } from 'expo-camera';
import React, {useState} from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as ImageManipulator from 'expo-image-manipulator';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import HomeScreen from "./screens/HomeScreen";
import PredictionScreen from './screens/PredictionScreen';

const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const photoHandler = async (photo) => {
    const cropData = {
      originX: 0,
      originY: 1000,
      width: photo.width,
      height: photo.height - 1500
    }
    if (photo.shape !== "square"){
      const croppedPhoto = await ImageManipulator.manipulateAsync(photo.uri, [{crop: cropData}]);
      setPhoto(croppedPhoto);
    }  
    else{
      setPhoto(photo);
    }
  }

  const clearStorage = async () => {
    await AsyncStorage.setItem("@allCollected", "false");
    await AsyncStorage.removeItem("@todo");
    await AsyncStorage.removeItem("@done");
  }

  const factHandler = async () => {
    const facts = require("./components/facts.json");
    const todo = await AsyncStorage.getItem("@todo");
    const done = await AsyncStorage.getItem("@done");

    if (todo === null){
      await clearStorage();
      await AsyncStorage.setItem("@todo", JSON.stringify(shuffle(facts)));
      await AsyncStorage.setItem("@done", JSON.stringify([]));
      return await factHandler();
    }

    const storedTodo = JSON.parse(todo);
    const storedDone = JSON.parse(done);
    const storedFacts = storedTodo.concat(storedDone);

    console.log(storedTodo.length)
    console.log(storedDone.length)
    console.log(facts.length)

    if (storedFacts.length < facts.length){
      const newIds = facts.map(elem => elem.fact).filter(elem => !storedFacts.map(elem => elem.fact).includes(elem));
      const newFacts = facts.filter(elem => newIds.includes(elem.fact));
      const toStoreFacts = storedTodo.concat(shuffle(newFacts));
      await AsyncStorage.setItem("@todo", JSON.stringify(toStoreFacts));
      await AsyncStorage.setItem("@allCollected", "false");
      return await factHandler();
    }
    if (storedFacts.length > facts.length){
      const newIds = facts.map(elem => elem.fact);
      const newTodo = storedTodo.filter(elem => newIds.includes(elem.fact));
      const newDone = storedDone.filter(elem => newIds.includes(elem.fact));
      await AsyncStorage.setItem("@todo", JSON.stringify(newTodo));
      await AsyncStorage.setItem("@done", JSON.stringify(newDone));
    }
  }

  const cacheAssetsAsync = async () => {
    //await clearStorage();
    await factHandler();
    await Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
      })
    setLoaded(true);
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
