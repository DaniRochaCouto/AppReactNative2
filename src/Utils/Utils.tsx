import AsyncStorage from '@react-native-async-storage/async-storage';

//import { AsyncStorage } from "react-native";

//Salvar token
export async function saveToken (token)  {
    try {
        const jsonValue = JSON.stringify(token)
        await AsyncStorage.setItem('token', jsonValue)
    } catch (e) {
        console.log(e)
    }
}

//Recuperar token
export async function getToken ()  {
    try {
        const jsonValue = await AsyncStorage.getItem('token');
       // console.log('jsonValue', jsonValue);
       return jsonValue != null ? JSON.parse(jsonValue) : null;
      //return jsonValue != null ? jsonValue : null;
    } catch(e) {
        console.log(e)
    }
}

//Deletar token
export async function deleteToken ()  {
    try {
        await AsyncStorage.removeItem('token')
    } catch(e) {
        console.log(e)
    }
}