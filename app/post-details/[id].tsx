import { PostData } from "@/types/post";
import { getPostbyLocalId } from "@/utils/local-storage";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { View } from "react-native";

export default function PostDetailsPage() {
    const {id} = useLocalSearchParams<{id: string}>()

    const [post, setPost] = useState<PostData | null>(null)

    async function fetchPostFromLocal(inputId: string) {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        const postLocal = await getPostbyLocalId(inputId);
        if (postLocal) {
            setPost(postLocal)
        }
    }

    useEffect(() => {
        fetchPostFromLocal(id);
    },[id])

    if (post === null) {
        return <View>
            <Text>
                LASTER
            </Text>
        </View>
    }
    
    return <View>
        <Text>
            {post.title}, {post.description}
        </Text>
    </View>
}