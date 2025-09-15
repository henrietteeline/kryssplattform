import { StyleSheet, Text, View } from "react-native";

export default function PostDetails(){
    return <View style={style.mainContainer}>
        <Text>Her kommer det detaljer om innlegg</Text>
    </View>
}

const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})