import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import {getToken} from '../../Utils/Utils'
import { RootStackParamList } from '../../Routes/RoutesController';
import { StackScreenProps } from "@react-navigation/stack";

type iProps = StackScreenProps<RootStackParamList, "Detalhes">;
const DetailsView = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    //const token = getToken(); // Coloque seu token aqui
        console.log('token no produtos', token);
    fetch('https://fiap-reactjs-presencial.herokuapp.com/storeProducts/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        setData(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

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