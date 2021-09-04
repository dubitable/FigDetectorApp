import React from "react";
import { StyleSheet, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

const MoreButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <MaterialIcons name="more-horiz" size={props.size} color="white" />
        </TouchableOpacity> 
    )
}


export default MoreButton;