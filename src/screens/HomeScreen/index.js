import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

const Index = ({ navigation }) => {
  return (
    <Container>
      <TextStyled>READIFY</TextStyled>
      <Container>
        <Button onPress={() => navigation.navigate('Home')}>
          <ButtonText>Home</ButtonText>
        </Button>
      </Container>
    </Container>
  ); 
};


// creation des Styled Components
const TextStyled = styled.Text`
  flex:1;
  font-size: 20px;
  text-align: center;
  color: #a6219d;
`;

const Container = styled.View`
  position: absolute;
  top: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
`;

const Button = styled.TouchableOpacity`
  background-color: green;
  padding: 10px;
  border-radius: 99px;
  margin: 14px;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  color: white;
`;

export default Index;
