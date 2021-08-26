import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, Linking, Alert, Image } from 'react-native';

import factObjects from "./facts";
import config from "./config";
import InfoCard from "./InfoCard";

const sample = (array) => {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
}

const LoadingScreen = props => {
    useEffect(() => {
        return;
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

    const [fact, setFact] = useState(sample(factObjects));
    
    return (
        <View style = {styles.screen}> 
            <InfoCard style = {styles.card} fact = {fact} onPress= {() => setFact(sample(factObjects))}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        width: "100%",
        height: "100%",
        backgroundColor: config.backgroundColor,
        justifyContent: "center",
        alignItems: "center"
    },
});

export default LoadingScreen;