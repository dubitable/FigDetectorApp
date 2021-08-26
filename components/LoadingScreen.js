import React, {useEffect} from "react";
import { StyleSheet, Text, View, Linking, Alert } from 'react-native';

const LoadingScreen = props => {
    useEffect(() => {
        props.startAsync()
        .then((response) => {
            console.log(response);
            if (response.status == 200){
                response.json()
                .then(prediction => {
                    props.onFinish(prediction);
                })
            }
        })
        .catch((error) => {
            Alert.alert("Request Failed", 
                        "This is most likely a network error. Either you do not have access to Internet, or have not allowed the app to use it.",
                        [
                            {
                                text: "OK",
                                onPress: () => props.onError()
                            },
                            {
                                text: "Settings",
                                onPress: () => Linking.openSettings()
                            }
                        ]
            )
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