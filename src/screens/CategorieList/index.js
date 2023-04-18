import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { firebase } from '../../config/FirebaseConfig';
import { View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Alert } from 'react-native';

import { SearchBar } from 'react-native-elements';

const CategoryContainer = styled.View`
  background-color: ${({ bgColor }) => bgColor};
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  elevation: 3;
  width: ${Dimensions.get('window').width / 2 - 20}px;
  aspect-ratio: 1;
`;
const CategoryName = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const BackButton = styled.TouchableOpacity`
  background-color: #ccc;
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
`;
const DeleteButton = styled.TouchableOpacity`
  background-color: #f00;
  padding: 5px;
  border-radius: 5px;
  margin-top: 10px;
`;
const DeleteButtonText = styled.Text`
  color: white;
  font-weight: bold;
  text-align: center;
  
`;

const BackButtonText = styled.Text`
  color: white;
  font-weight: bold;
  text-align: center;
`;

const CategoryList = ({ navigation }) => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sorting, setSorting] = useState('asc'); // Ajout d'une variable sorting et de son état initial

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('categories')
      .onSnapshot((querySnapshot) => {
        const categories = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            bgColor: getRandomColor(),
          }));
          const sortedCategories = categories.sort((a, b) => a.name.localeCompare(b.name));
          setCategories(sortedCategories);
        });
      return () => unsubscribe();
    }, []);
  
    useEffect(() => {
      const filtered = categories.filter(
        (category) => category.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1,
      );
      const sortedFilteredCategories = filtered.sort((a, b) => {
        if (sorting === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
      setFilteredCategories(sortedFilteredCategories);
    }, [searchText, categories, sorting]);
  
    const renderCategory = ({ item }) => (
      <CategoryContainer bgColor={item.bgColor}>
        <CategoryName>{item.name}</CategoryName>
        <DeleteButton onPress={() => deleteCategory(item.id)}>
          <DeleteButtonText>Supprimer</DeleteButtonText>
        </DeleteButton>
      </CategoryContainer>
    );
  
    const handleBackPress = () => {
      navigation.goBack();
    };
    const Search = ({ searchText, setSearchText, placeholder }) => {
      return (
        <SearchBar
          platform="ios"
          value={searchText}
          placeholder={placeholder}
          onChangeText={setSearchText}
              />
            );
          };
  
  
    const deleteCategory = (categoryId) => {
      Alert.alert(
        'Supprimer la catégorie',
        'Êtes-vous sûr de vouloir supprimer cette catégorie ?',
        [
          {
            text: 'Annuler',
            onPress: () => console.log('Annuler Pressed'),
            style: 'cancel',
          },
          {
            text: 'Supprimer',
            onPress: () =>
            firebase
              .firestore()
              .collection('categories')
              .doc(categoryId)
              .delete()
              .then(() => {
                console.log('Catégorie supprimée !');
            })
            .catch((error) => {
                console.error('Erreur lors de la suppression de la catégorie : ', error);
            }),
        style: 'destructive',
      },
    ],
    { cancelable: false },
    );
  };
  return (
    <View>
    <BackButton onPress={handleBackPress}>
      <BackButtonText>Retour</BackButtonText>
    </BackButton>
    <Search searchText={searchText} setSearchText={setSearchText} placeholder="Rechercher une catégorie" />
    <TouchableOpacity onPress={() => setSorting(sorting === 'asc' ? 'desc' : 'asc')}>
      <Text>Trier par nom ({sorting === 'asc' ? 'ascendant' : 'descendant'})</Text>
    </TouchableOpacity>
    <FlatList
    data={filteredCategories}
    renderItem={renderCategory}
    keyExtractor={(item) => item.id}
    numColumns={2}
    />
    </View>
  );
};
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  export default CategoryList;