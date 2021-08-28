import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, Linking, Alert, Image, Platform } from 'react-native';
import { AdMobBanner } from "expo-ads-admob";

import factObjects from "../components/facts";
import constants from "../components/constants";
import InfoCard from "../components/InfoCard";
import SpinningFig from "../components/SpinningFig";

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

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

const delayHandler = async (start, delay) => {
    const time = delay - (Date.now() - start);
    if (time > 0){
        await sleep(time);
    }
}

const LoadingScreen = props => {
    useEffect(() => {
        const start = Date.now();
        props.startAsync()
        .then((response) => {
            //console.log(JSON.stringify(response));
            if (response.status == 200){
                response.json()
                .then(prediction => {
                    delayHandler(start, 4500)
                    .then(() => {
                        props.onFinish(prediction);
                    })
                   
                })
            }
            else{
                Alert.alert("Request Failed", 
                        "Something went wrong during processing. Please try again.",
                        [constants.okButton])
                props.onError();
            }
            
        })
        .catch((error) => {
            console.log(error);
            Alert.alert("Request Failed", 
                        "This is most likely a network error. Either you do not have access to Internet, or have not allowed the app to use it.",
                        [constants.okButton, constants.settingsButton])
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

    let iosBannerId = "ca-app-pub-3623149433945070/7836145577";
    let androidBannerId = "ca-app-pub-3623149433945070/5570264251";
    
    let adId = Platform.OS == "ios" ? iosBannerId : androidBannerId;

    return (
        <View style = {styles.screen}> 
            <AdMobBanner adUnitID={adId}/>
            <InfoCard style = {styles.card} fact = {facts[0]} onPress= {newFactHandler}/>
            <SpinningFig/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        width: "100%",
        height: "100%",
        backgroundColor: constants.backgroundColor,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
});

export default LoadingScreen;