import React from "react";
import { processColor, StyleSheet, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const SwitchCam = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <MaterialCommunityIcons style = {props.style} name="camera-switch-outline" size={props.size} color="white" />
        </TouchableOpacity>
    )
}

export default SwitchCam;