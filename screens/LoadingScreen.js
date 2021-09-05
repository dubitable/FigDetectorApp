import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, Linking, Alert, Image, Platform } from 'react-native';
import { AdMobBanner } from "expo-ads-admob";

import constants from "../components/constants";
import InfoCard from "../components/InfoCard";
import SpinningFig from "../components/SpinningFig";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    const requestHandler = async () => {
        const start = Date.now();
        props.startAsync()
        .then((response) => {
            //console.log(JSON.stringify(response));
            if (response.status == 200){
                response.json()
                .then(prediction => {
                    delayHandler(start, 0)
                    .then(() => {
                        console.log(Date.now() - start)
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
    }

    const [fact, setFact] = useState(null);

    const factHandler = async () => {
        let todo = JSON.parse(await AsyncStorage.getItem("@todo"));
        let done = JSON.parse(await AsyncStorage.getItem("@done"));
        if (todo.length === 0){
            const facts = require("../components/facts.json");
            await AsyncStorage.setItem("@todo", JSON.stringify(shuffle(facts)));
            await AsyncStorage.setItem("@done", JSON.stringify([]));
            await AsyncStorage.setItem("@allCollected", "true");
            todo = JSON.parse(await AsyncStorage.getItem("@todo"));
            done = JSON.parse(await AsyncStorage.getItem("@done"));
            console.log(todo.length);
            console.log(done.length);
        }
        done.push(todo[0]);
        setFact(todo[0]);
        todo.shift();
        AsyncStorage.setItem("@todo", JSON.stringify(todo))
        AsyncStorage.setItem("@done", JSON.stringify(done))
    }

    useEffect(() => {
        factHandler();
        requestHandler();
    }, [])


    const adUnitIds = {
        top: Platform.select({
            ios: 'ca-app-pub-3623149433945070/7836145577',
            android: 'ca-app-pub-3623149433945070/5570264251',
        }),
        bottom: Platform.select({
            ios: 'ca-app-pub-3623149433945070/9820500454',
            android: 'ca-app-pub-3623149433945070/9002242807',
        }),
        test: Platform.select({
            ios: 'ca-app-pub-3940256099942544/2934735716',
            android: 'ca-app-pub-3940256099942544/6300978111',
        })
    }

    let card = null;
    if (fact){
        card = <InfoCard style = {styles.card} fact = {fact}/>
    }
    return (
        <View style = {styles.screen}> 
            <AdMobBanner adUnitID={adUnitIds.test}/>
            <View style = {styles.container}>
                {card}
                <SpinningFig/>
            </View>
            <AdMobBanner adUnitID={adUnitIds.test}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        width: "100%",
        height: "100%",
        backgroundColor: constants.backgroundColor,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center"
    },
    container: {
        justifyContent: "center",
        alignItems: "center"
    }
});

export default LoadingScreen;