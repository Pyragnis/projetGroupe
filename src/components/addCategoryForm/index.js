import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import styled from 'styled-components/native';
import { addCategory } from '../../actions/categoryActions';

const AddCategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const [filterText, setFilterText] = useState('');
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categoryReducer.categories);

  const handleInputChange = (text) => {
    setCategoryName(text);
  };

  const handleFilterChange = (text) => {
    setFilterText(text);
  };

  const handleSubmit = () => {
    const newCategory = {
      id: new Date().getTime(),
      name: categoryName
    };
    dispatch(addCategory(newCategory));
    setCategoryName('');
  };

  // useEffect(() => {
  //   // Ajouter deux catégories par défaut
  //   if (typeof categories == 'undefined' ) {
  //     dispatch(addCategory({ id: 1, name: 'Horreur' }));
  //     dispatch(addCategory({ id: 2, name: 'Divertissement' }));
  //   }
  // }, []);

  const filteredCategories = categories?.filter(category => category.name && category.name.toLowerCase().includes(filterText.toLowerCase())) ?? [];

  return (
    <Container>
      
      <CustomInput
        label="Nom de la catégorie"
        value={categoryName}
        onChangeText={handleInputChange}
      />
      <AddButton mode="contained" onPress={handleSubmit}>
        Ajouter la catégorie
      </AddButton>
      
      <CustomInput
        label="Filtrer les catégories"
        value={filterText}
        onChangeText={handleFilterChange}
      />
      <CategoryList>
        <ScrollView>
          {filteredCategories.map(category => (
            <Category key={category.id}>{category.name}</Category>
          ))}
        </ScrollView>
      </CategoryList>
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

const CustomInput = styled(TextInput)`
  margin-bottom: 20px;
  margin-top: 20px;
`;

const AddButton = styled(Button)`
  margin-top: 10px;
  background-color: #4CAF50;
`;

const CategoryList = styled.View`
  flex: 1;
  margin-top: 10px;
`;

const Category = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
`;

export default AddCategoryForm;
