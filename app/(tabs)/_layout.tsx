import { Tabs } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';

// ALLE NAVIGASJONER I TABBAR lages her.

export default function TabBar() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{
                title: "Home",
                tabBarIcon: ({color}) => (
                    <AntDesign name="home" size={24} color="black" />
                )
            }}/>
            <Tabs.Screen name="profile" options={{
                title: "Profile",
                tabBarIcon: ({color}) => (
                    <AntDesign name="user" size={24} color="black" />
                )
            }}/>
        </Tabs>
    );
}
