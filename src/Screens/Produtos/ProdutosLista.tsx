
  import React from "react";
  import {
    FlatList,
    View,
  } from "react-native";
  
  import { StackNavigationProp } from "@react-navigation/stack";
  import { RootStackParamList } from "../../Routes/RoutesController";
  //import DrawerMenu from "../../Components/DrawerMenu/DrawerMenu";
  import Colors from "../../Styles/Colors";
  import IProdutos  from "../../Interfaces/IProdutos";
  
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
  
  type iProps = {
    navigation: StackNavigationProp<RootStackParamList, "Produtos">;
    dataConnection: IProdutos[];
    isLoading: boolean;
    goToDetail: (item: IProdutos) => void;
  };
  
  const ProdutosLista = ({ navigation, dataConnection, isLoading, goToDetail }:iProps) => {
    console.log(dataConnection);
    const RenderItem = ({item}: {item: IProdutos}) => {
      console.log(item)
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
  
    let loadingBox = null;
    if (isLoading) {
      loadingBox = (
        <StyledActivityIndicator
          size="large"
          color={Colors.PrimaryDark}
        />
      );
    }
    return (
      <MainSafeAreaView>
        {/* <DrawerMenu /> */}
        {loadingBox}
        <FlatList
          data={dataConnection}
          renderItem={({item}: { item: IProdutos}) => <RenderItem item={item} />}
          keyExtractor={(item: IProdutos) => item._id.toString()}
        />
      </MainSafeAreaView>
    );
  };
  
  export default ProdutosLista;