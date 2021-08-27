import React, {useState} from "react";
import { StyleSheet, Text, View, Button, Image, ScrollView, Dimensions} from 'react-native';

import {BarChart} from "react-native-chart-kit";
import * as FileSystem from 'expo-file-system';

import LoadingScreen from "./LoadingScreen";
import config from "./config";

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
            <LoadingScreen startAsync = {predict} onFinish = {setResponse} onError={props.reset}/>
        )
    }

    let message = "NOT FIG";

    if (response.class_name == "fig"){
        message = "FIG";
    }

    const labels = Object.keys(response.confidences);
    const confidences = Object.values(response.confidences).map(value => Number(value));

    const figLabels = ["Fig", "Not Fig"];
    const isFig = Number(response.confidences["fig"]) + Number(response.confidences["desert fig"]);
    const figConfidences = [isFig, 1 - isFig];

    
    const width = Dimensions.get("window").width;
    const height = (width * props.photo.height) / props.photo.width
    console.log(props.photo);

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle = {styles.scroll}>
                <View style = {styles.imageContainer}>
                    <Image style = {styles.image} source = {{uri: props.photo.uri}} resizeMode="contain" width={width} height = {height}/>
                </View>
                <Text> {message} </Text>
                <Button title="Home" onPress={props.reset}/>
            </ScrollView>
            
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: config.backgroundColor
    },
    scroll: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16
    }
})

export default PredictionScreen;