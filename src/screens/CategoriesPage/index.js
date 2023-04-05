import React from 'react';
import styled from 'styled-components/native';
import AddCategoryForm from '../../components/addCategoryForm'
import CategoryList from '../../components/categoryList';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CategoriesPage = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Title>Categories</Title>
      <AddCategoryForm />
      <CategoryList />
      <BackButton onPress={() => navigation.goBack()}>
        <ButtonText>Back</ButtonText>
      </BackButton>
    </Container>
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

export default CategoriesPage;
