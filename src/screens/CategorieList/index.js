import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { firebase } from '../../config/FirebaseConfig';
import { View, Text, FlatList, TouchableOpacity, Dimensions, ImageBackground , Image} from 'react-native';
import styled from 'styled-components/native';
import { Alert } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


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
  background-color: #009933;
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
  align-self: flex-end;
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

  const Search = ({ searchText, setSearchText, placeholder }) => {
    return (
      <SearchBar
        platform="ios"
        value={searchText}
        placeholder={placeholder}
        onChangeText={setSearchText}
        containerStyle={{ backgroundColor: '#009933' }}
        inputContainerStyle={{ backgroundColor: 'white' }}
      />
    );
  };

  const deleteCategory = (categoryId) => {
    Alert.alert(
    'Supprimer une catégorie',
    'Êtes-vous sûr de vouloir supprimer cette catégorie ?',
    [
    {
    text: 'Annuler',
    onPress: () => console.log('Suppression annulée'),
    style: 'cancel',
    },
    {
    text: 'Supprimer',
    onPress: async () => {
    try {
    await firebase.firestore().collection('categories').doc(categoryId).delete();
    dispatch({ type: 'DELETE_CATEGORY', payload: categoryId });
    } catch (error) {
    console.error(error);
    }
    },
    },
    ],
    { cancelable: false },
    );
    };
    
    return (
    <ImageBackground
    source={require('../../../public/asset/logo1.png')}
    style={{ width: '100%', height: '100%' }}>
    <View style={{ flex: 1 }}>
    <Search
           searchText={searchText}
           setSearchText={setSearchText}
           placeholder="Rechercher une catégorie..."
         />
    <FlatList
    data={filteredCategories}
    keyExtractor={(item) => item.id}
    numColumns={2}
    renderItem={renderCategory}
    contentContainerStyle={{ alignItems: 'center' }}
    />
    <TouchableOpacity
    style={{ alignSelf: 'flex-end' }}
    onPress={() => setSorting(sorting === 'asc' ? 'desc' : 'asc')}>
    <Text style={{ color: '#009933', fontWeight: 'bold' }}>
    {sorting === 'asc' ? 'Trier par ordre décroissant' : 'Trier par ordre croissant'}
    </Text>
    </TouchableOpacity>
    <View style={{position: 'relative'}}>
    <BackButton onPress={() => navigation.goBack()} style={{position: 'absolute', bottom: 10, left: 10}}>
  <Image source={require('../../../public/asset/greenArrow.png')} style={{width: 20, height: 20}} />
</BackButton>
</View>

    </View>
    </ImageBackground>
    );
    
    };
    
    
    export default CategoryList;
