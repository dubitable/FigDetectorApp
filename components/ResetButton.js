import React, {useState} from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const Fig = props => {
    let transform = [{ rotate: "-20deg" }];
    return (
        <Image style={{...styles.image, transform: transform}} source={require("../assets/images/fig.png")} width={40} height={40}/>
    )
}

const ResetButton = props => {

    return (
        <View style={{...props.style, ...styles.container}}>
            <Fig/><Fig/><Fig/>
            <TouchableOpacity onPress={props.onPress}>
                <MaterialCommunityIcons style={{marginHorizontal: 10}} name="backup-restore" size={75} color="white" />
            </TouchableOpacity>
            <Fig/><Fig/><Fig/>
        </View>
        
    )
}

const styles = StyleSheet.create({
    card:{
        backgroundColor: "#1768AC"
    },
    container: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        marginHorizontal: 10
    }
})


export default ResetButton;