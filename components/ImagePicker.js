import React from "react";
import { StyleSheet, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

const ImagePicker = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <MaterialIcons style = {props.style} name="photo-library" size={props.size} color="white" />
        </TouchableOpacity> 
    )
}


export default ImagePicker;