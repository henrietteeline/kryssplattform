import { PostData } from "@/types/post";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storeData(key: string, value: string) {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        console.log("Feil med storeData()" + e)
    }
}

export async function getData(key: string) { // trenger kun en nøkkel
    try {
        const data = await AsyncStorage.getItem(key)
        if (data !== null) {
            console.log(data);
            return data;
        }
    } catch (e) {
        console.log("Feil med postData()" + e)
    }
}

// FINNE ID:
export async function getPostbyLocalId(id: string) {
    try {
        const data = await AsyncStorage.getItem("postStore");
        if (data !== null) {
            const posts: PostData[] = JSON.parse(data)
            return posts.find(post=> post.id === id);
        }
    } catch (e) {
        console.log("feil med id", e)
    }
}