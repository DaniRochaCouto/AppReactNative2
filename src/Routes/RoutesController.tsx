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
//import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


//import HomeController from "../Screens/Home/HomeController";
//import DetailController from "../Screens/Detail/DetailController";

export type RootStackParamList = {
    Login: undefined;
    Cadastro: undefined;
   // Produtos: undefined;
   // Favoritos: undefined;
   // Details: { itemID: number; info: string };
  };
  
  const Stack = createStackNavigator<RootStackParamList>();
  const Drawer = createDrawerNavigator();

  function RoutesController() {
    const StackHome = () => {
      return (
        <Stack.Navigator>
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