import React, {useState} from "react";
import { StyleSheet, Image, TouchableOpacity} from 'react-native';

const PhotoButton = (props) => {
    const cameraRef = props.camera;
    return (
        <TouchableOpacity onPress={async() => {
            let photo = await cameraRef.takePictureAsync();
            props.setPhoto(photo);
        }}>
            <Image style = {props.style} source={require("../assets/images/figbutton.png")} resizeMode="contain"/>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
})

export default PhotoButton;