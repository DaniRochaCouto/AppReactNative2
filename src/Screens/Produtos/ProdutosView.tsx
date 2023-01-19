

import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, TouchableHighlight, View} from 'react-native';


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

type iProps = {
  navigation: StackScreenProps<RootStackParamList, "Produtos">;
  dataConnection: IProdutos[];
  isLoading: boolean;
  
};
 
const ProdutosView = ({navigation, route}:iProps) => {
  //const [data, setData] = useState(null);
  const [data, setData] = useState<IProdutos[]>([]);
  const [isLoading, setLoading] = useState(true);
  const RenderItem = ({item}: {item: IProdutos}) => {
    console.log('Dani', item)
    function goToDetail(item: IProdutos): void {
       {
        navigation.push("Detalhes", {
          itemID: item._id,
          info: JSON.stringify(item),
        });
      };
    }

    return (
      <ContainerItem
        onPress={() => goToDetail(item)}
      >
        <>
          <TextsView>
            
            <View>
              <TextNameStyle>
                <TextTitle>
                  {item.name} 
                </TextTitle>
              </TextNameStyle>
              <TextNameStyle>
                <TextDetail>
                  {item.price} 
                </TextDetail>
              </TextNameStyle>
              <TextNameStyle>
                <TextDetail>Favorito: {item.favorite}</TextDetail>
              </TextNameStyle>
            </View>
          </TextsView>
          <Separator />
        </>
      </ContainerItem>
    );
  };

  const getProdutos = async () => {
    const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbmlyb2NoYWNvdXRvQGdtYWlsLmNvbSIsInVzZXJJRCI6IjYzYjMyYzMxMzc2YjBhMTViZWNkOGUzNyIsImlhdCI6MTY3NDE2ODEyMywiZXhwIjoxNjc0MTcxNzIzfQ.G8KT0DnpWHpaug5d9ko4V1Se77IQrWeNb_QG8yVoBIk';

     
    try {
      const response = await fetch('https://fiap-reactjs-presencial.herokuapp.com/storeProducts/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const json = await response.json();
      setData(json.products);
      console.log(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProdutos();
    
  }, []);
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
            <Text>
              {item.name}, {item.price}
            
            </Text>
          )}
        />
        </SafeAreaView>
      /* )}
    </View> */
  );
};

/*   useEffect(() => {
    //const token = getToken(); // Coloq  ue seu token aqui
    const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbmlyb2NoYWNvdXRvQGdtYWlsLmNvbSIsInVzZXJJRCI6IjYzYjMyYzMxMzc2YjBhMTViZWNkOGUzNyIsImlhdCI6MTY3NDE2MDkyMCwiZXhwIjoxNjc0MTY0NTIwfQ.w5tKe3nzd2e5a46TBSoQR9MdY0X3PC_n1JcVmtqrP8U';

        console.log('token no produtos', token);
    fetch('https://fiap-reactjs-presencial.herokuapp.com/storeProducts/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => response.json())
      .then(responseJson => {
        setData(responseJson);
        console.log(responseJson.products);
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
}; */

export default ProdutosView;