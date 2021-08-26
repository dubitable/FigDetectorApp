import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, Linking, Alert, Image } from 'react-native';

import factObjects from "./facts";
import config from "./config";
import InfoCard from "./InfoCard";
import SpinningFig from "./SpinningFig";

const sample = (array) => {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
}

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

const LoadingScreen = props => {
    useEffect(() => {
        props.startAsync()
        .then((response) => {
            //console.log(JSON.stringify(response));
            if (response.status == 200){
                response.json()
                .then(prediction => {
                    props.onFinish(prediction);
                })
            }
            else{
                Alert.alert("Request Failed", 
                        "Something went wrong during processing. Please try again.",
                        [config.okButton])
                props.onError();
            }
            
        })
        .catch((error) => {
            Alert.alert("Request Failed", 
                        "This is most likely a network error. Either you do not have access to Internet, or have not allowed the app to use it.",
                        [config.okButton, config.settingsButton])
            props.onError();
        });
    }, [])

    const [facts, setFacts] = useState(shuffle(factObjects));

    const newFactHandler = () => {
        if (facts.length > 1){
            const array = [...facts];
            array.shift();
            setFacts(array);
        }
        else{
            setFacts(shuffle(factObjects));
        }
    }
    
    return (
        <View style = {styles.screen}> 
            <InfoCard style = {styles.card} fact = {facts[0]} onPress= {newFactHandler}/>
            <SpinningFig/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        width: "100%",
        height: "100%",
        backgroundColor: config.backgroundColor,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
});

export default LoadingScreen;