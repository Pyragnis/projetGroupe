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
      <Text>Category name:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
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
