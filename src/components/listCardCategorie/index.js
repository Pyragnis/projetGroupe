import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { removeCategory } from '../../actions/categoryActions';
import { FlatList } from 'react-native';

const ListCardCategorie = () => {
  const categories = useSelector(state => state.categoryReducer);
  const dispatch = useDispatch();

  const handleRemoveCategory = (categoryId) => {
    dispatch(removeCategory(categoryId));
  };

  const renderCategory = ({ item }) => (
    <CategoryCard>
      <CategoryImage source={require('../../../public/asset/cadre.png')} />
      <CategoryInfo>
        <CategoryName>{item.name}</CategoryName>
        <DeleteButton onPress={() => handleRemoveCategory(item.id)}>
          <DeleteButtonText>Delete</DeleteButtonText>
        </DeleteButton>
      </CategoryInfo>
    </CategoryCard>
  );

  return (
    <Container>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={category => category.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </Container>
  );
};

const Container = styled.View`
  margin: 20px;
`;

const CategoryCard = styled.View`
  flex: 1;
  margin: 10px;
  border-radius: 5px;
  overflow: hidden;
`;

const CategoryImage = styled.Image`
  height: 150px;
  width: 100%;
`;

const CategoryInfo = styled.View`
  padding: 10px;
  background-color: #fff;
  flex: 1;
  justify-content: space-between;
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

const styles = {
  row: {
    justifyContent: 'space-between',
  },
};

export default ListCardCategorie;
