import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Alert, Linking} from 'react-native';

import { Camera } from 'expo-camera';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';

import PhotoButton from "./PhotoButton";

const front = Camera.Constants.Type.front;
const back = Camera.Constants.Type.back;

const HomeScreen = props => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null)
    const [type, setType] = useState(props.type);
    const [lastTap, setLastTap] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

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

    const imagePickerHandler = async() => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted"){
            Alert.alert("Permissions Denied", 
                        "Please allow access to your Photo Library if you want to use this feature.",
                        [
                            {
                                text: "OK"
                            },
                            {
                                text: "Settings",
                                onPress: () => Linking.openSettings()
                            }
                        ])
            return;
        }
        const options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: false
        }
        let result = await ImagePicker.launchImageLibraryAsync(options);
        props.setPhoto(result)
    }

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
                        <View style={styles.icons}>
                            <TouchableOpacity onPress={imagePickerHandler}>
                                <MaterialIcons style = {styles.libIcon} name="photo-library" size={50} color="white" />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={switchType}>
                                <MaterialCommunityIcons style = {styles.switchIcon} name="camera-switch-outline" size={50} color="white" />
                            </TouchableOpacity>
                        </View>
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
    icons:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 50
    },

    libIcon: {
        marginLeft: 20
    },

    switchIcon: {
        marginRight: 20
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