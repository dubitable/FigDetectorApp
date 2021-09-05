import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useState} from "react";
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import InfoCard from "./InfoCard";

const FigGallery = props => {
    let [data, setData] = useState(null);

    const load = async () => {
        let todo = JSON.parse(await AsyncStorage.getItem("@todo"));
        let data = JSON.parse(await AsyncStorage.getItem("@done"));
        props.setData({todo: todo.length, done: data.length})
        data = data.map(elem => {
            return {key: elem["key"], fact: elem["fact"]};
        });
        data = data.sort((first, second) => first.key - second.key)
        setData(data);
    }

    if (data === null){
        load();
        return <View/>
    }
    
    return (
        <FlatList
            contentContainerStyle = {styles.list}
            data={data}
            renderItem={(elem) => <InfoCard style = {styles.card} fact={elem.item}/>}
        />
    )
}

const styles = StyleSheet.create({
    list: {
        alignItems: "center"
    },
    card: {
        marginVertical: 10
    }
})

export default FigGallery;