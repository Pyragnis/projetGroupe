import React from 'react';
import { Text, View, Image, Animated } from 'react-native';
import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';

const Index = ({ navigation }) => {
  const zoomInAnimation = {
    0: { scale: 1 },
    1: { scale: 1.2 }
  };

  return (
    <Container>
      <Logo source={require('../../../public/asset/logo.png')}/>
      <ButtonsContainer>
        <Animatable.View animation={zoomInAnimation}>
          <Button onPress={() => navigation.navigate('Scanner')}>
            <ButtonText>Scanner</ButtonText>
          </Button>
        </Animatable.View>
        <Animatable.View animation={zoomInAnimation}>
          <Button onPress={() => navigation.navigate('Blibliotheque')}>
            <ButtonText>add categorie</ButtonText>
          </Button>
        </Animatable.View>
        <Animatable.View animation={zoomInAnimation}>
          <Button onPress={() => navigation.navigate('CategorieList')}>
            <ButtonText>list Categorie</ButtonText>
          </Button>
        </Animatable.View>
        <Animatable.View animation={zoomInAnimation}>
          <Button onPress={() => navigation.navigate('Booklist')}>
            <ButtonText>liste livres</ButtonText>
          </Button>
        </Animatable.View>
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
  background-color: #3CB371; /* green color */
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
  background-color: #008000; /* green color */
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
