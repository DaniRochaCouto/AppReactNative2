//import AsyncStorage from '@react-native-community/async-storage';

//Salvar token
export async function saveToken (value: any)  {
    try {
        const jsonValue = JSON.stringify(value)
        //await AsyncStorage.setItem('token', jsonValue)
    } catch (e) {
        console.log(e)
    }
}

//Recuperar token
export async function getToken ()  {
    try {
        //const jsonValue = await AsyncStorage.getItem('token')
       //return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        console.log(e)
    }
}

//Deletar token
export async function deleteToken ()  {
    try {
        //await AsyncStorage.removeItem('token')
    } catch(e) {
        console.log(e)
    }
}