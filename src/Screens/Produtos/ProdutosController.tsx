import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, TouchableHighlight, View} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';


import {getToken} from '../../Utils/Utils'
import { RootStackParamList } from '../../Routes/RoutesController';
import { StackScreenProps } from "@react-navigation/stack";
import IProdutos from '../../Interfaces/IProdutos';
import {
  ContainerItem,
  MainSafeAreaView,
  StyledActivityIndicator,
  TextNameStyle,
  TextsView,
  TextTitle,
  TextDetail,
  Separator,
  StyledImage,
} from "./ProdutosStyles";
import { SafeAreaView } from 'react-native-safe-area-context';
import ProdutosLista from './ProdutosLista';

type iProps = {
  navigation: StackScreenProps<RootStackParamList, "Produtos">;
 // dataConnection: IProdutos[];
 // isLoading: boolean;
  
};
 
const ProdutosController = ({navigation, route}:iProps) => {
  //const [data, setData] = useState(null);
  const [data, setData] = useState<IProdutos[]>([]);
  const [isLoading, setLoading] = useState(true);
  
  
  
  const getProdutos = async () => {
    //const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbml0ZXN0ZUBnbWFpbC5jb20iLCJ1c2VySUQiOiI2M2MzNGExNjZhZmI5ODU2ZjAwMWM1MmEiLCJpYXQiOjE2NzQzMTYyMTAsImV4cCI6MTY3NDMxOTgxMH0.16evZP1hWOKrVmcS3tjrvfmfplBXWzcVbqh80bkUDHg';
    const token = await getToken();

    console.log('token na produtosView', token);
    try {
      const response = await fetch('https://fiap-reactjs-presencial.herokuapp.com/storeProducts/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const json = await response.json();
      setData(json.products);
      
    } catch (error) {
      console.error('Error', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProdutos();
    
  }, []);

  
  console.log('data', data)
  const goToDetail = (item: IProdutos) => {
    navigation.navigate("Detalhes", {
      itemID: item._id,
      info: JSON.stringify(item),
    });
  };
  return (
    <ProdutosLista
      navigation={navigation}
      dataConnection={data}
      isLoading={isLoading}
      goToDetail={goToDetail}
    />
  );
};
export default ProdutosController;