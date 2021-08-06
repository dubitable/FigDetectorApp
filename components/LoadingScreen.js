import React, {useEffect} from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const LoadingScreen = props => {
    useEffect(() => {
        props.startAsync()
        .catch(error => {
            props.onFinish(error);
        })
        .then(async(response) => {
            if (response.status === 200){
                const json = await response.json();
                props.onFinish(json);
            }
            else{
                props.onFinish(JSON.stringify(response));
            }
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