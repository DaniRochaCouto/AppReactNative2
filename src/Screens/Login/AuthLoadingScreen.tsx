import React, { useEffect } from 'react'
import {saveToken, deleteToken, getToken} from '../../Utils/Utils';
import { View,  ActivityIndicator } from 'react-native'
import { RootStackParamList, StackProdutos, StackHome } from '../../Routes/RoutesController';
import { StackScreenProps } from '@react-navigation/stack';


type iProps = StackScreenProps<RootStackParamList, "Loading">;
export default function AuthLoadingScreen({ route, navigation }:iProps) {

  useEffect(() => {
    async function handleUserNextScreen() {
      const userToken = await getToken()
      if (userToken) 
      navigation.navigate('ProdutosA' )
      else navigation.navigate('LoginA')
    }

    handleUserNextScreen();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
}

AuthLoadingScreen.navigationOptions = () => {
  return {
    header: null,
  };
};
