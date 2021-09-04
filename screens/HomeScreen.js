import React, {useState, useEffect} from "react";
import { StyleSheet, Image, View, TouchableOpacity, TouchableWithoutFeedback, Alert, Linking} from 'react-native';

import { Camera } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';

import ImgPicker from "../components/ImagePicker";
import SwitchCam from "../components/SwitchCam";
import MoreButton from "../components/MoreButton";
import PhotoButton from "../components/PhotoButton";
import constants from "../components/constants";
import ExtrasModal from "./ExtrasModal";

const front = Camera.Constants.Type.front;
const back = Camera.Constants.Type.back;

const HomeScreen = props => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null)
    const [type, setType] = useState(props.type);
    const [lastTap, setLastTap] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

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
                        [constants.okButton, constants.settingsButton])
            return;
        }
        const options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: false,
            allowsEditing: true
        }
        let result = await ImagePicker.launchImageLibraryAsync(options);
        if (! result.cancelled){
            result.shape = "square";
            props.setPhoto(result);
        }
    }

    const requireCamera = () => {
        Alert.alert("Permissions Denied", 
                        "Please allow access to your Camera if you want to use this feature.",
                        [constants.okButton,constants.settingsButton])
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
            <ExtrasModal isVisible={isModalVisible}/>
            <TouchableWithoutFeedback activeOpacity={0} onPress={doubleTapHandler}>
                <Camera style={styles.camera} type={type} ref={ref => {
                    setCameraRef(ref);
                }}>
                    <View style={styles.cameraView}>
                        <View style={styles.icons}>
                            <ImgPicker onPress = {imagePickerHandler} style={styles.libIcon} size={50}/>
                            <MoreButton onPress={toggleModal} size={50}/>
                            <SwitchCam onPress = {switchType} style={styles.switchIcon} size={50}/>
                        </View>
                        <View style={styles.buttonContainer}>
                            <PhotoButton style = {styles.button} camera = {cameraRef} setPhoto={props.setPhoto}/>
                        </View>
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
    buttonContainer: {
        width: "100%",
        alignItems: "center",
        borderColor: "white",
        //borderTopWidth: 5,
        paddingTop: 20
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
        marginTop: 50,
        borderColor: "white",
        paddingBottom: 20,
        //borderBottomWidth: 5
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
        backgroundColor: constants.backgroundColor,
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