import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { Camera } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import PhotoButton from "./PhotoButton";

const front = Camera.Constants.Type.front;
const back = Camera.Constants.Type.back;

const HomeScreen = props => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null)
    const [type, setType] = useState(props.type);
    const [lastTap, setLastTap] = useState(null);

    const switchType = () => {
        if (type === back){
            props.setCamType(front);
            setType(front)
        }
        else{
            props.setCamType(back);
            setType(back)
        }
    }

    const doubleTapHandler = () => {
        const now = Date.now();
        const doublePressDelay = 400;
        if (lastTap && (now - lastTap) < doublePressDelay){
            switchType();
        }
        else{
            setLastTap(now);
        }
    }

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
            <TouchableWithoutFeedback activeOpacity={0} onPress={doubleTapHandler}>
                <Camera style={styles.camera} type={type} ref={ref => {
                    setCameraRef(ref);
                }}>
                    <View style={styles.cameraView}>
                        <TouchableOpacity onPress={switchType}>
                            <MaterialCommunityIcons style = {styles.switchIcon} name="camera-switch-outline" size={50} color="white" />
                        </TouchableOpacity>
                        <PhotoButton style = {styles.button} camera = {cameraRef} setPhoto={props.setPhoto}/>
                    </View>
                </Camera>
            </TouchableWithoutFeedback>
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
        marginBottom: 30,
        alignSelf: "center"
    },

    switchIcon: {
        alignSelf: "flex-end",
        marginRight: 20,
        marginTop: 50
    },
    
    cameraView: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 25
    }
})

export default HomeScreen;