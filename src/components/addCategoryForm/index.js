import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { addCategory } from '../../actions/categoryActions';

const AddCategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (text) => {
    setCategoryName(text);
  };

  const handleSubmit = () => {
    const newCategory = {
      id: new Date().getTime(),
      name: categoryName
    };
    dispatch(addCategory(newCategory));
    setCategoryName('');
  };

  return (
    <Container>
      <InputLabel>Category Name:</InputLabel>
      <InputText
        placeholder="Enter category name"
        value={categoryName}
        onChangeText={handleInputChange}
      />
      <AddButton onPress={handleSubmit}>
        <AddButtonText>Add Category</AddButtonText>
      </AddButton>
    </Container>
  );
};

const Container = styled.View`
  margin: 20px;
`;

const InputLabel = styled.Text`
  font-size: 18px;
  margin-bottom: 5px;
`;

const InputText = styled.TextInput`
  height: 40px;
  border-color: gray;
  border-width: 1px;
  margin-bottom: 20px;
  padding: 5px;
`;

const AddButton = styled.TouchableOpacity`
  background-color: #4CAF50;
  padding: 10px;
  border-radius: 5px;
`;

const AddButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  text-align: center;
`;

export default AddCategoryForm;
