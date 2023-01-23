

import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, TouchableHighlight, TouchableOpacity, View} from 'react-native';
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
  TextBlock,
  TextBoxContainer
} from "../Produtos/ProdutosStyles";
import { SafeAreaView } from 'react-native-safe-area-context';

import estilos from '../Produtos/estilos';
import { Button } from 'react-native-elements';


 type iProps = {
  navigation: StackScreenProps<RootStackParamList, "Favoritos">;
  //dataConnection: IProdutos[];
  //isLoading: boolean;
  
};
 
const FavoritosView = ({navigation, route}:iProps) => {
  //const [data, setData] = useState(null);
  const [data, setData] = useState<IProdutos[]>([]);
  const [isLoading, setLoading] = useState(true);
  
  
  
  const getProdutos = async () => {
    //const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbml0ZXN0ZUBnbWFpbC5jb20iLCJ1c2VySUQiOiI2M2MzNGExNjZhZmI5ODU2ZjAwMWM1MmEiLCJpYXQiOjE2NzQzMTYyMTAsImV4cCI6MTY3NDMxOTgxMH0.16evZP1hWOKrVmcS3tjrvfmfplBXWzcVbqh80bkUDHg';
    const token = await getToken();

    console.log('token na favoritosView', token);
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
  console.log('data: ', data);
  let loadingBox = null;
  if (setLoading === true) {
    loadingBox = (
      <StyledActivityIndicator
        size="large"
        //color={Colors.PrimaryDark}
      />
    );
  }

  
  

  return (
    /* <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : ( */
      <SafeAreaView>
        {loadingBox}
        <FlatList
          
          data={data}
          keyExtractor={(item: IProdutos) => item._id.toString()}
          renderItem={({item}) => (
            <View style={estilos.item}>
                  
                  <Text style={estilos.repositorioNome}>{item.name}</Text>
                  <Text style={estilos.repositorioPreco}>Valor: R$ {item.price}</Text>
                  <Text style={estilos.repositorioData}> {item.favorite? "Favorito" : "Não favorito"}</Text>
                  <Button
                       onPress={() => navigation.navigate('Detalhes', {
                        itemID: item._id                        
                      })}
                      title="Detalhes"
                      //color="#0e0947"
                      
                  />
              </View>      
          
            
              
            
            
          )} 
         /*  renderItem={({item}: { item: IProdutos}) => <RenderItem item={item} />} */
        />
        </SafeAreaView>
      /* )}
    </View> */
  );
};



export default ProdutosView;