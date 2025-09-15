
import { PostData } from "@/types/post";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export type PostProps = {
  postData: PostData;
};

export default function Post({ postData }: PostProps) {
  return ( // navigerer til post-detail når man trykker.
    <Pressable onPress={ () => router.push({
      pathname: "/post-details/[id]", 
      params: {id: postData.id}, 
      })}> 
      <View style={styles.post}>
      <Text style={styles.text}>{postData.title}</Text>
      <View>
        <Text>{postData.description}</Text>
      </View>
    </View>
    </Pressable>
  );
}

// CSS
const styles = StyleSheet.create({
  post: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  text: {
    fontWeight: "bold",
  }
});