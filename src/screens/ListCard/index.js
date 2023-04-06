import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import CategoryList from '../components/CategoryList';

const categories = [
  { id: 1, name: 'Horreur' },
  { id: 2, name: 'Divertissement' },
  { id: 3, name: 'Romance' },
  { id: 4, name: 'Action' },
  { id: 5, name: 'Aventure' },
  { id: 6, name: 'Science-fiction' },
  { id: 7, name: 'Comédie' },
  { id: 8, name: 'Documentaire' },
  { id: 9, name: 'Animation' },
  { id: 10, name: 'Drame' },
];

const CategoryScreen = () => {
    const navigation = useNavigation();
  return (
    <Container>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => <CategoryListItem category={item} />}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const CategoryListItem = styled(CategoryList)`
  flex: 1;
  margin: 10px;
`;

export default CategoryScreen;
