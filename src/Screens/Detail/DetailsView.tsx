import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import {getToken} from '../../Utils/Utils'
import { RootStackParamList } from '../../Routes/RoutesController';
import { StackScreenProps } from "@react-navigation/stack";
import IProdutos from '../../Interfaces/IProdutos';

type iProps = {navigation: StackScreenProps<RootStackParamList, "Detalhes">;
itemID: string;
};


const DetailsView = ({ navigation, route }:iProps) => {
  
  const [data, setData] = useState<IProdutos>( );
  const [isLoading, setLoading] = useState(true);
  const getProduto = async () => {
    //const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbml0ZXN0ZUBnbWFpbC5jb20iLCJ1c2VySUQiOiI2M2MzNGExNjZhZmI5ODU2ZjAwMWM1MmEiLCJpYXQiOjE2NzQzMTYyMTAsImV4cCI6MTY3NDMxOTgxMH0.16evZP1hWOKrVmcS3tjrvfmfplBXWzcVbqh80bkUDHg';
    const token = await getToken();
    console.log('token na detalhesView', token);
    const objectItem ='62ce3e33a3c2b4b0af2f5a2a'
    //const objectItem = route.parms.itemID;
    
    try {
       // console.log('itemID', itemID)
        //console.log('itemID', objectItem)
        
      const response = await fetch(`https://fiap-reactjs-presencial.herokuapp.com/storeProducts/product/${objectItem}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const json = await response.json();
      setData(json.product);
      
      
    } catch (error) {
      console.error('Error', error);
    } finally {
      setLoading(false);
    }
  };  


  
  useEffect(() => {
    getProduto();
    
  }, []);
  console.log('data detalhes: ', data);
  return (
    <View>
      {data ? (
        <Text>Dados da API: {JSON.stringify(data)}</Text>
      ) : (
        <Text>Carregando dados da API...</Text>
      )}
    </View>
  );
};

export default DetailsView;