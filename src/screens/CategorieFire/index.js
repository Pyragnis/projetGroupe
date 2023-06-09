import React from 'react';
import styled from 'styled-components/native';
import CategoryForm from '../../components/CategoryForm';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackgroundImage from '../../components/PersonnalBackground';

const CategorieFire = () => {
  const navigation = useNavigation();

  return (
    <BackgroundImage source={require('../../../public/LogoF-vert.png')}>
    <Container>
      <Title>Categories</Title>
      <CategoryForm/>
      <BackButton onPress={() => navigation.goBack()}>
        <ButtonText>Back</ButtonText>
      </BackButton>
    </Container>
    </BackgroundImage>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color:white;
  text-align:center;
`;

const BackButton = styled.TouchableOpacity`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ccc;
  border-radius: 5px;
  align-self: flex-start;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export default CategorieFire;
