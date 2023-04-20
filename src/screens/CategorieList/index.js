import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { firebase } from '../../config/FirebaseConfig';
import { View, Text, FlatList, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackgroundImage from '../../components/PersonnalBackground';

const CategoryContainer = styled.TouchableOpacity`
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
  margin-bottom:120px;
`;

const BackButton = styled.TouchableOpacity`
  background-color: #808080;
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

const SearchBarContainer = styled.View`
  padding: 10px;
  background-color: #f0f0f0;
`;

const SearchBar = styled.TextInput`
  background-color: white;
  border-radius: 5px;
  padding: 10px;
`;

const CategoryList = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = firebase.firestore()
      .collection('categories')
      .onSnapshot((querySnapshot) => {
        const categories = querySnapshot.docs.map((doc) => ({ id: doc.id, name: doc.data().name, bgColor: getRandomColor() }));
        setCategories(categories);
        setFilteredCategories(categories);
      });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const filtered = categories.filter(category => {
      return category.name.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredCategories(filtered);
  }, [searchText, categories]);

  const handlePress = (id) => {
    navigation.navigate('DetailCategorie', { categoryId: id })
  }

  const renderCategory = ({ item }) => (
    <CategoryContainer bgColor={item.bgColor} onPress={() => handlePress(item.id)}>
      <CategoryName>{item.name}</CategoryName>
      <DeleteButton onPress={() => deleteCategory(item.id)}>
        <DeleteButtonText>Supprimer</DeleteButtonText>
      </DeleteButton>
    </CategoryContainer>
  );

  const handleBackPress = () => {
    navigation.goBack();
  }
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const deleteCategory = (categoryId) => {
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir supprimer cette catégorie ?',
      [        {          text: 'Annuler',          style: 'cancel',        },        {          text: 'Supprimer',          onPress: () => {            firebase.firestore().collection('categories').doc(categoryId).delete(); } } ], { cancelable: true } ); }

      const handleSearch = (text) => {
      setSearchText(text);
      }
      
      return (
        <BackgroundImage source={require('../../../public/LogoF-vert.png')}>
      <View>
      
      <SearchBarContainer>
      <SearchBar placeholder="Rechercher une catégorie" onChangeText={handleSearch} />
      </SearchBarContainer>
      <FlatList
      data={filteredCategories}
      numColumns={2}
      renderItem={renderCategory}
      keyExtractor={item => item.id}
      />
      <BackButton onPress={handleBackPress}>
        <BackButtonText>Retour</BackButtonText>
      </BackButton>
      </View>
      </BackgroundImage>
      );
      };

      export default CategoryList;