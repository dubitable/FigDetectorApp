import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { Camera } from 'expo-camera';
import PhotoButton from "./PhotoButton";

const HomeScreen = props => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={styles.cameraContainer}>
            <Camera style={styles.camera} type={type} ref={ref => {
                setCameraRef(ref) ;
            }}>
                <View style={styles.cameraView}>
                    <PhotoButton style = {styles.button} camera = {cameraRef}/>
                </View>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    
    cameraContainer: {
        flex: 1,
        width: "100%",
        height: "100%"
    },
    camera: {
        flex: 1
    },
    button: {
        width: 100,
        height: 100,
        marginBottom: 30
    },
    cameraView: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: "flex-end",
        alignItems: 'center'
    },
    text: {
        fontSize: 25
    }
})

export default HomeScreen;