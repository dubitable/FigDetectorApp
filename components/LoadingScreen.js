import React, {useEffect} from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const LoadingScreen = props => {
    useEffect(() => {
        props.startAsync().then((response) => {
            response.json()
            .then(prediction => {
                props.onFinish(prediction);
            })
        });
    }, [])
    
    
    return (
        <View> 
            <Text> LOADING.... </Text>
        </View>
    )
}

const styles = StyleSheet.create({

});

export default LoadingScreen;