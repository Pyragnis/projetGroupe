import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { firebase } from '../../config/FirebaseConfig';
import { View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import styled from 'styled-components/native';

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

const BackButtonText = styled.Text`
  color: white;
  font-weight: bold;
  text-align: center;
`;

const CategoryList = ({ navigation }) => {
  const dispatch = useDispatch();
  const [categories, setCategories] = React.useState([]);

  useEffect(() => {
    const unsubscribe = firebase.firestore()
      .collection('categories')
      .onSnapshot((querySnapshot) => {
        const categories = querySnapshot.docs.map((doc) => ({ id: doc.id, name: doc.data().name, bgColor: getRandomColor() }));
        setCategories(categories);
      });
    return () => unsubscribe();
  }, []);

  const renderCategory = ({ item }) => (
    <CategoryContainer bgColor={item.bgColor}>
      <CategoryName>{item.name}</CategoryName>
    </CategoryContainer>
  );

  const handleBackPress = () => {
    navigation.goBack();
  }

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
