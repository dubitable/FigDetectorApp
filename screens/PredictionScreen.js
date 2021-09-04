import React, {useState} from "react";
import { StyleSheet, Text, View, Button, Image, ScrollView, Dimensions} from 'react-native';

import * as FileSystem from 'expo-file-system';

import LoadingScreen from "./LoadingScreen";
import constants from "../components/constants";
import Card from "../components/Card";
import ResetButton from "../components/ResetButton";

const api = "https://detectors.herokuapp.com/figdetectorjs";
const local = "http://127.0.0.1:5000/figdetectorjs";

const Fig = props => {
    let transform = [{ rotate: "-20deg" }];
    return (
        <Image style={{...styles.image, transform: transform}} source={require("../assets/images/fig.png")} width={40} height={40}/>
    )
}

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


    let startAsync = predict;
    let onFinish = setResponse;
    let onError = props.reset;

    if (props.testMode){
        startAsync = () => new Promise((resolve, reject) => {});
    }

    if (response === null){
        return (
            <LoadingScreen startAsync = {startAsync} onFinish = {onFinish} onError={onError}/>
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

    let confidence = isFig > 1 - isFig ? isFig : 1 - isFig;
    confidence = (confidence * 100).toString().slice(0, 4)

    const width = Dimensions.get("window").width;
    const height =  props.photo.shape === "square" ? width :  (width * props.photo.height) / props.photo.width
    
    let figs = [...Array(7).keys()].map((item) => <Fig key={item}/>);

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle = {styles.scroll}>
                <View style={styles.predictionContainer}>
                    <View style={styles.figContainer}>
                        {figs}
                    </View>
                    <Card cardStyle = {styles.card1}> {message} </Card>
                    <View style = {styles.imageContainer}>
                        <Image style = {styles.resultImage} source = {{uri: props.photo.uri}} resizeMode="contain" width={width} height = {height}/>
                    </View>
                    <Card cardStyle = {styles.card2}> {confidence}% CONFIDENCE </Card>
                    <ResetButton style={styles.button} onPress={props.reset}> HOME </ResetButton>
                </View>
            </ScrollView>
            
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: constants.backgroundColor
    },
    scroll: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    predictionContainer: {
        marginTop: 50,
        width: "100%",
        alignItems: "center"
    },
    card1: {
        width: "100%",
    },
    card2: {
        width: "100%",
    },
    button: {
        marginVertical: 20
    },
    figContainer:{
        flex: 1,
        flexDirection: "row"
    },
    image: {
        marginHorizontal: 10,
        marginBottom: 10
    },
    resultImage: {

    }
})

export default PredictionScreen;