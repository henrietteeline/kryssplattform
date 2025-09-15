import { useAuthSession } from "@/providers/authctx";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function ProfilePage() {

    const {userNameSession, signIn, SignOut} = useAuthSession();
    const [userNameText, setUserNameText] = useState("");

    return <View style={styles.mainContainer}>
        
        <Text>Profilside</Text>
        {userNameSession !=null && (
            <Text>Hei på deg {userNameSession}</Text>
        )}

        <Pressable // 1. måte å linke på
            style={styles.button}
            onPress={() =>
                router.push("/declarations")}
        >
            <Text>Deklarasjoner</Text>
        </Pressable>

        <Text>
        Trykk{" "}
        { // 2. måte å linke på
          <Link style={styles.link} href={"/declarations"}>
            her
          </Link>
        }{" "}
        for informasjon om appen
      </Text>

        <View style={styles.textInputContainer}>
            <TextInput
                style={styles.textInput}
                value={userNameText}
                placeholder="Tittel"
                onChangeText={setUserNameText}
            />
        </View>
               
                
        <View style={styles.buttonContainer}>
            <Pressable
                style={[styles.button, { borderWidth: 2, borderColor: "gray" }]}
                onPress={() => {signIn(userNameText)}}
            >
                <Text>Logg Inn</Text>
            </Pressable>

            <Pressable
                onPress={() => SignOut()}
                style={[styles.button, { borderWidth: 2, backgroundColor: "lightgrey" }]}
            >
                <Text>Lukk</Text>
            </Pressable>
        </View>                               
        
    </View> // End-section - main container
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "lightgrey",
        paddingHorizontal: 16,
        paddingTop: 24,
        justifyContent: "center",
        alignItems: "center",

    },
    buttonContainer: {
        flexDirection: "row",
        width: "50%",
        justifyContent: "space-between",
        // paddingHorizontal: 30,
        marginTop: 16,
    },
    textInputContainer: {
        gap: 16,
        alignItems: "center",
        width: "100%",
    },
    textInput: {
        borderBottomWidth: 1,
        width: "75%",
        fontSize: 18,
    },
    button: {
        // backgroundColor: "red",
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    link: {
        fontStyle: "italic",
    }
})