import React, { useState, createContext} from 'react';
import SignIn from '../signIn';
import { Alert } from 'react-native';
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { isAxiosError } from "axios"
import api from '../services/api';

type Nav = {
    navigate: (value: string) => void;
}

export const AuthContext = createContext({})

function AuthProvider({children}: any){
    const [user, setUser] = useState({});
    const navigation = useNavigation<Nav>();

    const router = useRouter();
    const params = useLocalSearchParams();

    async function signIn(email: string, password:string) {
        if(email !== '' && password !== ''){
            try {
                const response = await api.post(`/motSignIn`, {
                  email,
                  password,
                })
                let id = response.data.id;  
                let nomCliente = response.data.name;
                let motAvatar = response.data.avatar;
                let motToken = response.data.token;
                router.push(`./Map?idMot=${id}&name=${nomCliente}&token=${motToken}&avatar=${motAvatar}` as any );          
            } catch (error) {
                if (isAxiosError(error)) {
                  return Alert.alert(error.response?.data)
                }
                Alert.alert("Não foi possÃ­vel entrar.")
            }
        } 
    }

    return(
        <AuthContext.Provider value={{signIn, user  }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;