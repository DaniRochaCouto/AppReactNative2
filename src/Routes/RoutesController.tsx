import React from 'react';
import LoginView from '../Screens/Login/LoginView'
import CadastroView from '../Screens/Cadastro/CadastroView';
//import App from '../../../App';
import { registerRootComponent } from 'expo';
//import "react-native-gesture-handler";

import { Button, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProdutosView from '../Screens/Produtos/ProdutosView';
import DetailsView from '../Screens/Detail/DetailsView';
//import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {getToken , deleteToken } from '../../src/Utils/Utils';

//import HomeController from "../Screens/Home/HomeController";
//import DetailController from "../Screens/Detail/DetailController";

export type RootStackParamList = {
    Login: undefined;
    Cadastro: undefined;
    Produtos: undefined;
   // Favoritos: undefined;
    Detalhes: { itemID: string; info: string };
  };
  
  const Stack = createStackNavigator<RootStackParamList>();
  //const Drawer = createDrawerNavigator();

  function RoutesController() {

    const token = undefined;
    //const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbml0ZXN0ZUBnbWFpbC5jb20iLCJ1c2VySUQiOiI2M2MzNGExNjZhZmI5ODU2ZjAwMWM1MmEiLCJpYXQiOjE2NzQxNTM4OTgsImV4cCI6MTY3NDE1NzQ5OH0.NLbEWxfcBTZE_04K37U9MkGwsDTyrEJv0SMprrbw16U';
     deleteToken ();
    //const token = await getToken();
    
    const StackHome = () => {
      
      return (
        token === undefined ? (
        <>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Login"
            component={LoginView}
            options={{ title: "Login" }}
          />
          <Stack.Screen
            name="Cadastro"
            component={CadastroView}
            options={{ title: "Cadastro" }}
          />
          <Stack.Screen
            name="Produtos"
            component= {StackProdutos }
            options={{ title: "Produtos" }}
          />
          </Stack.Navigator>

        </>
           ) : (
          <>
           <Stack.Navigator>
          <Stack.Screen
            name="Produtos"
            component= {StackProdutos }
            options={{ title: "Produtos" }}
          />
          </Stack.Navigator> 
          
          </>
          )
      );
    };

    const StackProdutos = () => {
      
      return (
        <Stack.Navigator>
          <Stack.Screen
            name="ProdutosLista"
            component={ProdutosView}
            options={{ title: "Produtos" }}
          />
          <Stack.Screen
            name="Detalhes"
            component={DetailsView}
            options={{ title: "Detalhes" }}
          />
        </Stack.Navigator>
      );
    };

    return (
       <NavigationContainer>
           <StackHome />
          
       </NavigationContainer>
   );

 };
/* const RoutesController = () => {    
    return (
       // <HomeView />
       <LoginView />
    );
};
 */


export default registerRootComponent(RoutesController);