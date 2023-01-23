import React from 'react';
import LoginView from '../Screens/Login/LoginView'
import CadastroView from '../Screens/Cadastro/CadastroView';
//import App from '../../../App';
import { registerRootComponent } from 'expo';
import "react-native-gesture-handler";

import { Button, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProdutosView from '../Screens/Produtos/ProdutosView';
import DetailsView from '../Screens/Detail/DetailsView';
//import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {getToken , deleteToken } from '../../src/Utils/Utils';
import ProdutosController from '../Screens/Produtos/ProdutosController';
import AuthLoadingScreen from '../Screens/Login/AuthLoadingScreen';
import FavoritosView from '../Screens/Favoritos/FavoritosView';

//import HomeController from "../Screens/Home/HomeController";
//import DetailController from "../Screens/Detail/DetailController";

export type RootStackParamList = {
    Login: undefined;
    Cadastro: undefined;
    Produtos: undefined;
    Favoritos: undefined;
    AuthLoadinScreen: undefined;
    Detalhes: { itemID: string  };
  }; 
  
  const Stack = createStackNavigator<RootStackParamList>();
  //const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();
  
    
  function RoutesController() {

    deleteToken();
    const StackHome = () => {
      
      return (
         (
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

    const StackAuthLoading = () => {
      
      return (
         (
        <>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Loading"
            component={AuthLoadingScreen}
            options={{ title: "Loading" }}
          />
          <Stack.Screen
            name="LoginA"
            component={StackHome}
            //options={{ title: "Cadastro" }}
          />
          <Stack.Screen
            name="ProdutosA"
            component= {StackProdutos }
            options={{ title: "Produtos" }}
          />
          </Stack.Navigator>

        </>
          
          )
      );
    };

     return (
       <NavigationContainer>
           <StackAuthLoading />
          
       </NavigationContainer>
   ); 
   /* return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Main">
        <Drawer.Screen name="Main" component={StackAuthLoading} />
        <Drawer.Screen name="Favoritos" component={FavoritosView} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
 */ };
/* const RoutesController = () => {    
    return (
       // <HomeView />
       <LoginView />
    );
};
 */


export default registerRootComponent(RoutesController);