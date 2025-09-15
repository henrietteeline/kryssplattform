import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function DeclarationsPage() {
    return <View style={style.mainContainer}>
        <Text>
        Trykk {" "}
        {
        <Link style={style.link} href="https://github.com/henrietteeline">
            her
        </Link>
        } {" "}
        for å komme til min GitHub.
        </Text>
    </View>
}

const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    link: {
        fontWeight: "bold",
    }
})