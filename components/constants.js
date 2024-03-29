const constants = {
    backgroundColor: "#9FA8DA",
    chartconstants: {
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        barPercentage:1,
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    },
    okButton: {
        text: "OK",
    },
    settingsButton: {
        text: "Settings",
        onPress: () => Linking.openSettings()
    }
}

export default constants;