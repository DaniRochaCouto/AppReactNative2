import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import {getToken} from '../../Utils/Utils'
import { RootStackParamList } from '../../Routes/RoutesController';
import { StackScreenProps } from "@react-navigation/stack";
import IProdutos from '../../Interfaces/IProdutos';
import estilos from './estilos';
import { SafeAreaView } from 'react-native-safe-area-context';


import { Button } from 'react-native-elements';
type iProps =  StackScreenProps<RootStackParamList, "Detalhes">;
//itemID: string;
//};


const DetailsView = ({ navigation, route }:iProps) => {
    const { itemID } = route.params;

  const [data, setData] = useState<IProdutos>( );
  const [isLoading, setLoading] = useState(true);

  const getProduto = async () => {
    //const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbml0ZXN0ZUBnbWFpbC5jb20iLCJ1c2VySUQiOiI2M2MzNGExNjZhZmI5ODU2ZjAwMWM1MmEiLCJpYXQiOjE2NzQzMTYyMTAsImV4cCI6MTY3NDMxOTgxMH0.16evZP1hWOKrVmcS3tjrvfmfplBXWzcVbqh80bkUDHg';
    const token = await getToken();
    console.log('token na detalhesView', token);
    const objectItem ='62ce3e33a3c2b4b0af2f5a2a'
    //const objectItem = route.parms.itemID;
    
    try {
       console.log('itemID', itemID)
        //console.log('itemID', objectItem)
        
      const response = await fetch(`https://fiap-reactjs-presencial.herokuapp.com/storeProducts/product/${itemID}`, {
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

    
    function favoritaProduto(productId: { productID: any; }): void {

        const favProduto = async () => {
            //const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbml0ZXN0ZUBnbWFpbC5jb20iLCJ1c2VySUQiOiI2M2MzNGExNjZhZmI5ODU2ZjAwMWM1MmEiLCJpYXQiOjE2NzQzMTYyMTAsImV4cCI6MTY3NDMxOTgxMH0.16evZP1hWOKrVmcS3tjrvfmfplBXWzcVbqh80bkUDHg';
        
        console.log("productId:", itemID)
        
        const token = await getToken();
        console.log('token na favProduto', token);    
            try {
               const response = await fetch(`https://fiap-reactjs-presencial.herokuapp.com/storeProducts/manageFavorite`, {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${token}`
                },
                body:JSON.stringify({
                   productId
                  })
             
              });
              const json = await response.json();
              //setData(json.product);
              
              
            } catch (error) {
              console.error('Error', error);
            } finally {
              setLoading(false);
            }
          };  
        favProduto();
    }

  return (
    <View>
      {data ? (
        <View style={estilos.item}>
                  
        <Text style={estilos.repositorioNome}>{data.name}</Text>
        <Text style={estilos.repositorioPreco}>Valor: R$ {data.price}</Text>
        <Text style={estilos.repositorioData}> {data.favorite? "Favorito" : "Não favorito"}</Text>
        <Button
             onPress={() => favoritaProduto( {
              productID: data._id                        
            })}
            title="Favoritar Produto"
            //color="#0e0947"
            
        />
    </View>     
        
      ) : (
        <Text>Carregando dados da API...</Text>
      )}
    </View>
  );
};

export default DetailsView;