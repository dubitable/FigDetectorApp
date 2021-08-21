import React, {useState} from "react";
import { StyleSheet, Text, View, Button, Image} from 'react-native';
import {BarChart} from 'react-native-chart-kit'
import * as FileSystem from 'expo-file-system';
import LoadingScreen from "./LoadingScreen";

const api = "https://detectors.herokuapp.com/figdetectorjs";
const local = "http://127.0.0.1:5000/figdetectorjs";

const PredictionScreen = (props) => {
    const [response, setResponse] = useState(null);

    const predict = async () => {
        const base64 = await FileSystem.readAsStringAsync(props.photo.uri, {"encoding": "base64"})
        const request = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
    
            body: JSON.stringify({
                "base64": base64 
            })
        }
        return fetch(api, request);
    }

    if (response === null){
        return (
            <LoadingScreen startAsync = {predict} onFinish = {setResponse}/>
        )
    }
    const src = {uri: props.photo.uri};
    
    console.log(response);

    let message = "NOT FIG";

    if (response.class_name == "fig"){
        message = "FIG";
    }

    return (
        <View style = {styles.screen}>
            <View style = {styles.imageContainer}>
                <Image style = {styles.image} source = {src}/> 
            </View>
            <Text> {message} </Text>
            <Button title="Home" onPress={props.reset}/>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flexDirection: "column",
        alignItems: "center"
    },
    imageContainer: {
        height: 320,
        width: 180
    },
    image: {
        height: "100%",
        width: "100%"
    }
})

export default PredictionScreen;