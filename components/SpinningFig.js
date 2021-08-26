import React, {useEffect, useState} from "react";
import { StyleSheet, Easing, View, Image, Animated} from 'react-native';


const SpinningFig = props => {
   const [spinValue, setSpinValue] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.loop(
            Animated.timing(
                spinValue,
                {
                    toValue: 1,
                    duration: 3000,
                    easing: Easing.linear, // Easing is an additional import from react-native
                    useNativeDriver: true  // To make use of native driver for performance
                }
            )
         ).start()
         
    }, [])

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    return (
        <View style = {styles.container}>
            <Animated.Image style = {{...styles.fig, transform: [{rotate: spin}]}} source={require("../assets/images/solo_fig.png")}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
       marginTop: 60
    },
    fig: {
        height: 60,
        width: 60
    }
})

export default SpinningFig;