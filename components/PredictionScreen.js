import React, {useState} from "react";
import { StyleSheet, Text, View, Button, Image} from 'react-native';
import LoadingScreen from "./LoadingScreen";

const createFormData = (photo) => {
    const data = new FormData();

    data.append('file', {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });
    return data;
};

const get = () => {
    return ({
        method: "GET",
    })
}

const post = (photo) => {
    return ({
        method: "POST",
        body: createFormData(photo)
    })
}
const predict = (photo) => {
    return fetch("https://detectors.herokuapp.com/figdetector", post(photo))
}



const PredictionScreen = (props) => {
    const [response, setResponse] = useState(null);

    const predictphoto = () => {
        return predict(props.photo)
    }

    if (response === null){
        return (
            <LoadingScreen startAsync = {predictphoto} onFinish = {setResponse}/>
        )
    }
    const src = {uri: props.photo.uri};
    console.log(src);
    return (
        <View style = {styles.screen}>
            <View style = {styles.imageContainer}>
                <Image style = {styles.image} source = {src}/> 
            </View>
            <Text> {JSON.stringify(response)} </Text>
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