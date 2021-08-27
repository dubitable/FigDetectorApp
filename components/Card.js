import React, {useState} from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';

const Card = props => {
    return (
        <View style = {{...styles.card, ...props.cardStyle}}>
            <Text style = {{...styles.text, ...props.style}}> {props.children} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#1768AC",
        alignItems: "center",
    },
    text: {
        fontFamily: "open-sans-bold",
        color: "white",
        fontSize: 30,
        padding: 10
    }
});

export default Card;