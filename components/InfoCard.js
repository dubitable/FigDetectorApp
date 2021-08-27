import React, {useState} from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';


const InfoCard = props => {
    let factText;
    try{
        if (props.fact.type === "text"){
            factText = (
                <Text style={styles.bodyText}> {props.fact.content} </Text>
            )
        }
    }
    catch{
        console.log(props.fact);
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