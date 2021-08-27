import React, {useState} from "react";
import { StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import constants from "./constants";

const PhotoButton = (props) => {
    const cameraRef = props.camera;
    return (
        <TouchableOpacity onPress={async() => {
            let photo = await cameraRef.takePictureAsync().catch(() => {
                Alert.alert("Camera Error", "Something went wrong during photo capture. Please try again.", [constants.okButton])
                return;
            });
            props.setPhoto(photo);
            
        }}>
            <Image style = {props.style} source={require("../assets/images/figbutton.png")} resizeMode="contain"/>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
})

export default PhotoButton;