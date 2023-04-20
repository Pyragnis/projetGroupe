import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../actions/addCategory';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components/native';

const Button = styled.TouchableOpacity`
  background-color: green;
  padding: 10px;
  border-radius: 5px;
  margin-top:10px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  text-align: center;
`;
const TextI = styled.Text`
  color: white;
  font-weight: bold;
  
`;
const StyledTextInput = styled.TextInput`
  height: 40px;
  border-color: gray;
  border-width: 1px;
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
  color:white;
`;


const CategoryForm = () => {
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = () => {
    dispatch(addCategory(categoryName));
    setCategoryName('');
    Alert.alert('Success', 'nouvelle catégorie ajouter');
  };

  return (
    <View>
      <TextI>Category name:</TextI>
      <StyledTextInput
        onChangeText={(text) => setCategoryName(text)}
        value={categoryName}
      />
      <Button onPress={handleSubmit}>
        <ButtonText>Add category</ButtonText>
      </Button>
    </View>
  );
};

export default CategoryForm;
