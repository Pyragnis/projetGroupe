import React from 'react';
import { Text, View, Image } from 'react-native';
import styled from 'styled-components/native';

const Index = ({ navigation }) => {
  return (
    <Container>
      <Logo source={require('../../../public/asset/logo.png')} />
      
      <ButtonsContainer>
      
        <Button onPress={() => navigation.navigate('Scanner')}>
          <ButtonText>Scanner</ButtonText>
        </Button>
        <Button onPress={() => navigation.navigate('Blibliotheque')}>
          <ButtonText> add categorie</ButtonText>
        </Button>
        <Button onPress={() => navigation.navigate('CategorieList')}>
          <ButtonText> list Categorie </ButtonText>
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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin-top: 20px;
`;

const Button = styled.TouchableOpacity`
  background-color: green;
  padding: 5px;
  border-radius: 99px;
  margin: 14px;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  color: white;
`;

export default Index;
