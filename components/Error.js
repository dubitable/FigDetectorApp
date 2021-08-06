import React from "react"
import { StyleSheet, View, Text} from "react-native"

const Error = props => {
    return (
        <View>
            <Text style={styles.text}> Permission is {props.permission} </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 25
    }
})

export default Error;