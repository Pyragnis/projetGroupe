import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { removeCategory } from '../../actions/categoryActions';

const CategoryList = () => {
  const categories = useSelector(state => state.categoryReducer);
  const dispatch = useDispatch();

  const handleRemoveCategory = (categoryId) => {
    dispatch(removeCategory(categoryId));
  };

  return (
    <Container>
      {categories.map(category => (
        <CategoryItem key={category.id}>
          <CategoryName>{category.name}</CategoryName>
          <DeleteButton onPress={() => handleRemoveCategory(category.id)}>
            <DeleteButtonText>Delete</DeleteButtonText>
          </DeleteButton>
        </CategoryItem>
      ))}
    </Container>
  );
};

const Container = styled.View`
  margin: 20px;
`;

const CategoryItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  padding: 10px;
`;

const CategoryName = styled.Text`
  font-size: 18px;
`;

const DeleteButton = styled.TouchableOpacity`
  background-color: #f44336;
  padding: 5px;
  border-radius: 5px;
`;

const DeleteButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export default CategoryList;
