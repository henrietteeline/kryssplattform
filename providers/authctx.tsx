import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type AuthContextType = {
    signIn: (userName: string) => void;
    SignOut: VoidFunction;
    userNameSession?: string | null;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined> (undefined)
export function useAuthSession() {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error("UseAuthSession must be used within an AuthContext Provider")
        
    }

    return value;
}

export function AuthSessionProvier ({children} : {children: ReactNode}) {
    const [userSession, setUserSession] = useState<string | null> (null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect (() => {
        AsyncStorage.getItem("authSession").then((value) => {
        setUserSession(value);
        setIsLoading(false);
    });
    },[]);

    return (
        <AuthContext value={{
            signIn: (userName: string) => {
                setUserSession(userName)
                AsyncStorage.setItem("authSession", userName)
            },
            SignOut: () => {
                setUserSession(null)
                AsyncStorage.removeItem("authSession")
            },
            userNameSession: userSession,
            isLoading: isLoading,
        }}>{children}</AuthContext>
    )
}
