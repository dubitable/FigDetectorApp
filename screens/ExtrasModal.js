import React, {useState} from "react";
import { StyleSheet, View, Image, ScrollView, Text, Dimensions, TouchableWithoutFeedback} from 'react-native';
import Modal from "react-native-modal";
import constants from "../components/constants";

const ExtrasModal = props => {
    return (
        <Modal isVisible={props.isVisible} style={styles.modal}>
            <View style={styles.view}>
                
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        margin: 0,
    },
    view:{
        flex: 1,
        backgroundColor: constants.backgroundColor, 
        marginTop: 120,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25
    }
})  

export default ExtrasModal;