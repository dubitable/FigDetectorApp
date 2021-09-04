import React, {useState} from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';


const InfoCard = props => {
    let number = Object.keys(props.fact)[0];
    let content = Object.values(props.fact)[0];
    return (
       <View style = {{...props.style, ...styles.card}}>
                <View style = {styles.container}>
                    <Text style = {styles.headerText}> Fig Fact #{number} </Text>
                    <Text style={styles.bodyText}> {content} </Text>
                </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    card: {
        backgroundColor: "#1768AC",
        width: "90%",
        borderRadius: 25
    },
    headerText: {
        marginTop: 10,
        color: "white",
        fontFamily: "open-sans-bold",
        fontSize: 20
    },
    bodyText: {
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 30,
        color: "white",
        fontFamily: "open-sans",
        fontSize: 20
    }
});

export default InfoCard;