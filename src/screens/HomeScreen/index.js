import React from 'react';
import { Text, View, Image } from 'react-native';
import styled from 'styled-components/native';

const Index = ({ navigation }) => {
  return (
    <Container>
      <Logo source={require('../../../public/asset/logo.png')}/>
      
      <ButtonsContainer>
      
        <Button onPress={() => navigation.navigate('Scanner')}>
          <ButtonText>Scanner</ButtonText>
        </Button>
        <Button onPress={() => navigation.navigate('Blibliotheque')}>
          <ButtonText> ajouter une catégorie</ButtonText>
        </Button>
        <Button onPress={() => navigation.navigate('CategorieList')}>
          <ButtonText> voir les Categories </ButtonText>
        </Button>
        <Button onPress={() => navigation.navigate('Booklist')}>
          <ButtonText> voir les livres </ButtonText>
        </Button>
      </ButtonsContainer>
    </Container>
  ); 
};

// création des Styled Components
const TextStyled = styled.Text`
  font-size: 20px;
  text-align: center;
  color: #a6219d;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.Image`
  width: 500px;
  height: 200px;
  
`;

const ButtonsContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Button = styled.TouchableOpacity`
  background-color: green;
  padding: 10px 25px;
  border-radius: 25px;
  margin: 14px;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  color: white;
  text-align: center;
`;


export default Index;
