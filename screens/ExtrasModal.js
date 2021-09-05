import React, {useState} from "react";
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import { Button } from 'react-native-ios-kit';

import { MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";

import constants from "../components/constants";
import FactGallery from "../components/FactGallery";

const Fig = props => {
    let transform = [{ rotate: "-20deg" }];
    return (
        <Image style={{ marginHorizontal: 10, transform: transform}} source={require("../assets/images/fig.png")} width={40} height={40}/>
    )
}

const Item = props => {
    return (
        <View style={{...itemStyles.container, ...props.containerStyle}}>
            <View>
                <Text> {props.title} </Text>
                <Text style={itemStyles.description}> {props.description} </Text>
            </View>
            
            {props.children}
            
        </View>
    )
}

const itemStyles = StyleSheet.create({
    container:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 30,
        marginVertical: 30
    },
    description: {
        width: 250
    }
})

const ExtrasModal = props => {
    const [figMode, setFigMode] = useState(false);
    const [data, setData] = useState({todo: 0, done: 0});

    let figs = [...Array(7).keys()].map((item) => <Fig key={item}/>);
    let screen;

    if (! figMode){
        screen = (
            <View style={styles.container}>
                <View style={styles.buttons}>
                    <Button inline style={styles.buttonText} onPress={props.toggleModal} > Dismiss </Button>
                    <Button inline style={styles.buttonText} onPress={props.toggleModal}> Dismiss </Button>
                </View>

                <ScrollView contentContainerStyle={styles.scroll}>

                    <View style={styles.header}>
                        <Text style={styles.titleText}> FIG DETECTOR </Text>
                        <View style={styles.figs}>
                            {figs}
                        </View>
                    </View>

                    <Item 
                    title="Gallery of Fig Facts" 
                    description="Celebrate your monumental acheivement of pressing a couple buttons."> 
                        <TouchableOpacity onPress={() => setFigMode(true)}> 
                            <MaterialIcons name="open-in-new" size={35} color="white" />
                        </TouchableOpacity>
                        
                    </Item>

                    <Item 
                    title="Submit A Fig Fact" 
                    description="Everyone at some point has dreamed of being included in the greatness that is this application."> 
                    
                    </Item>
                </ScrollView>
            </View>
        )
    }
    else{
        screen = (
            <View style={styles.container}>
                <View style={styles.buttons}>
                    <Button inline style={styles.buttonText} onPress={() => setFigMode(false)} > Back </Button>
                    <Button inline style={styles.buttonText} onPress={props.toggleModal}> Dismiss </Button>
                </View>
                <View style={styles.header}>
                        <Text style={styles.titleText}> FACT GALLERY {data.done}/{data.todo+data.done} </Text>
                        <View style={styles.figs}>
                            {figs}
                        </View>
                    </View>
                <FactGallery setData={setData}/>
            </View>
        )
    }
    return (
        <Modal isVisible={props.isVisible} style={styles.modal}>
            {screen}
        </Modal>
    )
}

const styles = StyleSheet.create({
    scroll:{

    },
    modal: {
        margin: 0,
    },
    container:{
        backgroundColor: constants.backgroundColor, 
        marginTop: 110,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        width: "100%",
        height: "100%",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
    header: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    buttons:{
        flexDirection: "row",
        marginVertical: 20,
        marginHorizontal:20,
        alignItems: "center",
        justifyContent: "space-between"
    },
    figs: {
        flexDirection: "row" ,
        marginBottom: 20 
    },
    image:{
        height: 100,
        width: 100
    },
    titleText: {
        fontFamily: "open-sans-bold",
        color: "white",
        fontSize: 35
    }
})  

export default ExtrasModal;