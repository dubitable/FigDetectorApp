import React, {useState} from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';

import config from "./config";

const InfoCard = props => {
    let factText;

    if (props.fact.type === "text"){
        factText = (
            <Text style={styles.bodyText}> {props.fact.content} </Text>
        )
    }
    
    return (
       <TouchableOpacity onPress={props.onPress} style = {{...props.style, ...styles.card}}>
                <View style = {styles.container}>
                    <Text style = {styles.headerText}> Fig Fact #{props.fact.number} </Text>
                    {factText}
                </View>
        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
    buttton: {
        width: "100%",
        height: "100%"
    },
    container: {
        alignItems: "center",
    },
    card: {
        backgroundColor: "#1768AC",
        width: "90%",
        height: "20%",
        borderRadius: 25
    },
    headerText: {
        marginVertical: 10,
        color: "white",
        fontFamily: "open-sans-bold",
        fontSize: 20
    },
    bodyText: {
        marginHorizontal: 20,
        color: "white",
        fontFamily: "open-sans",
        fontSize: 20
    }
});

export default InfoCard;