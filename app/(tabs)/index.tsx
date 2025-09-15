import Post from '@/components/Post';
import PostFormModal from '@/components/PostForModal';
import { PostData } from '@/types/post';
import { getData, storeData } from '@/utils/local-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';



export default function HomeScreen() {

  // Holder på en liste med innlegg som vises i FlatList:
  const [posts, setPosts] = useState<PostData[]>([]);

  // Styrer om modalene er åpne eller lukket:
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPostModalVisible, setIsPostModalVisible] = useState(false); 

  // Tar imot et nytt innlegg
  // Lagrer det i AsyncStorage (storeData) slik at det bevares neste gang appen åpnes.
  // Oppdaterer state (setPosts) slik at det vises på skjermen
  async function createPostLocal(newPost: PostData) {
    const updatedPostList = [...posts, newPost]
    storeData("postStore", JSON.stringify(updatedPostList)); // lagrer i LocalStorage, med JSON for omgjøring til string.
    setPosts(updatedPostList); // viser på skjermen
    console.log(posts);
  }

  // Henter lagrede innlegg fra AsyncStorage og oppdaterer state:
  async function getPostsFromLocal() {
    const existingPosts = await getData("postStore")
    if (existingPosts) {
      setPosts(JSON.parse(existingPosts));
    }
  }

  // Alt i LocalStorage kjører én gang når skjermen lastes inn:
  useEffect(() => {
    getPostsFromLocal();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Pressable onPress={() =>
              setIsModalVisible(true)
              }>
              <Text>Slett data</Text>
            </Pressable>
          ),

         headerRight: () => (
            <Pressable
               onPress={() => {
                setIsPostModalVisible(true);
              }}
            >
            <Text>Nytt innlegg</Text>
            </Pressable>
          )
        }}
      />

      <PostFormModal
        isVisible={isPostModalVisible} // sender kall til andre filen om at den skal åpnes
        setIsVisible={setIsPostModalVisible} // sender kall til andre filen om at den skal lukkes
        // Det nye innlegget dukker opp her, og vi kan legge det til i lista over innlegg
        addPost={createPostLocal} // Legger nytt innlegg i LocalStorage
      />

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modal}>
          <Pressable 
            onPress={ async() => {
              await AsyncStorage.clear();
              console.log("alt slettet");
            }}
            // sletter ikke innholdet på siden, bare i storage - må fikses
          > 
            <Text style={styles.redButton}>Slett alle data</Text>
          </Pressable>


          <Pressable onPress={() => setIsModalVisible(false)}>
            <Text style={styles.button}>Lukk</Text>

          </Pressable>
        </View>
      </Modal>

      <View>
        <Text style={styles.header}>Overskrift</Text>
      </View>

      <FlatList
        data={posts}
        ItemSeparatorComponent={() => <View style={{ height: 12 }}></View>}
        renderItem={(post) => <Post postData={post.item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  mainContainer: {
    flex: 1,
    backgroundColor: "lightgrey",
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  modal: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    backgroundColor: "white",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  header: {
    color: "white",
    fontWeight: "bold",
    padding: 10,
    fontSize: 24,
  },
  redButton: {
    color: "white",
    fontWeight: "bold",
    backgroundColor: "darkred",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: "grey",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  }
});

// AsyncStorage.clear() - Clearer hele localStorage