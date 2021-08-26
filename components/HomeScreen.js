import React, {useState, useEffect} from "react";
import { StyleSheet, Image, View, TouchableOpacity, TouchableWithoutFeedback, Alert, Linking} from 'react-native';

import { Camera } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';

import ImgPicker from "./ImagePicker";
import SwitchCam from "./SwitchCam";
import PhotoButton from "./PhotoButton";
import config from "./config";

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
                        [config.okButton, config.settingsButton])
            return;
        }
        const options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: false
        }
        let result = await ImagePicker.launchImageLibraryAsync(options);
        props.setPhoto(result)
    }

    const requireCamera = () => {
        Alert.alert("Permissions Denied", 
                        "Please allow access to your Camera if you want to use this feature.",
                        [
                            {
                                text: "OK"
                            },
                            {
                                text: "Settings",
                                onPress: () => Linking.openSettings()
                            }
                        ])
    }

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return (
            <View style = {noCamStyles.container}>
                <View style = {noCamStyles.icons}>
                    <ImgPicker onPress= {imagePickerHandler} size={100}/> 
                    <TouchableOpacity onPress= {requireCamera}>
                        <MaterialIcons name="camera-alt" size={100} color="white"/>
                    </TouchableOpacity>
                </View>
                <Image style = {noCamStyles.fig} source = {require("../assets/images/fig.png")}/>
            </View>
        );
    }
    
    return (
        <View style={styles.cameraContainer}>
            <TouchableWithoutFeedback activeOpacity={0} onPress={doubleTapHandler}>
                <Camera style={styles.camera} type={type} ref={ref => {
                    setCameraRef(ref);
                }}>
                    <View style={styles.cameraView}>
                        <View style={styles.icons}>
                            <ImgPicker onPress = {imagePickerHandler} style={styles.libIcon} size={50}/>
                            <SwitchCam onPress = {switchType} style={styles.switchIcon} size={50}/>
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
        marginBottom: 30
    },
    icons:{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        marginTop: 50
    },

    switchIcon: {
        marginRight: 20
    },
    
    cameraView: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    text: {
        fontSize: 25
    },
    switchIcon: {
        marginRight: 20
    },
    libIcon: {
        marginLeft: 20
    }
})

const noCamStyles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: config.backgroundColor,
    },
    icons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 50
    },
    fig: {
        height: 150,
        width: 150,
        marginTop: 50
    },
});

export default HomeScreen;