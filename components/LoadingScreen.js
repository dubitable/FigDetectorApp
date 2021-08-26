import React, {useEffect} from "react";
import { StyleSheet, Text, View, Linking, Alert } from 'react-native';

import config from "./config";

const LoadingScreen = props => {
    useEffect(() => {
        props.startAsync()
        .then((response) => {
            console.log(JSON.stringify(response));
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
    
    
    return (
        <View> 
            <Text> LOADING.... </Text>
        </View>
    )
}

const styles = StyleSheet.create({

});

export default LoadingScreen;