import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { firebase } from '../../config/FirebaseConfig';
import { View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';



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

const CategoryList = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = React.useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = firebase.firestore()
      .collection('categories')
      .onSnapshot((querySnapshot) => {
        const categories = querySnapshot.docs.map((doc) => ({ id: doc.id, name: doc.data().name, bgColor: getRandomColor() }));
        setCategories(categories);
      });
    return () => unsubscribe();
  }, []);

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
  

  const deleteCategory = (categoryId) => {
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir supprimer cette catégorie ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          onPress: () => {
            firebase.firestore().collection('categories').doc(categoryId).delete()
              .then(() => {
                console.log('Category deleted successfully');
              })
              .catch((error) => {
                console.log('Error deleting category:', error);
              });
          },
        },
      ],
      { cancelable: true },
    );
  };
  

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        numColumns={2}
        key={`${
          Dimensions.get('window').width / 2 // unique key based on width of device
        }-${categories.length}`} // unique key based on number of categories
        ListFooterComponent={
          <BackButton onPress={handleBackPress}>
            <BackButtonText>Retour</BackButtonText>
          </BackButton>
        }
      />
    </View>
  );
};

const getRandomColor = () => {
  const colors = ['#ff6666', '#ffcc66', '#66ff66', '#66cccc', '#6666ff', '#cc66ff'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

export default CategoryList;
