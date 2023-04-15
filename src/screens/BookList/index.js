import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import { firebase } from '../../config/FirebaseConfig';

const BookListContainer = styled.View`
  flex: 1;
  padding: 10px;
`;

const BookCard = styled.View`
  background-color: #fff;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  elevation: 3;
  align-items: center;
`;


const BookTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ISBN = styled.Text`
  font-size: 16px;
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

const BookList = ({ navigation }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('livres')
      .onSnapshot((querySnapshot) => {
        const books = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBooks(books);
      });
    return () => unsubscribe();
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const renderBook = ({ item }) => (
    <BookCard>
      <BookTitle>{item.title}</BookTitle>
      {item.image ? (
        <Image source={{ uri: item.image.replace("http", "https") }} style={{ width: 100, height: 150, marginBottom: 10 }} />
      ) : (
        <Image source={require('../../../public/asset/image.jpg')} style={{ width: 100, height: 150, marginBottom: 10 }} />
      )}
      <ISBN>ISBN: {item.isbn}</ISBN>
    </BookCard>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={books}
        renderItem={renderBook}
        keyExtractor={(item) => item.id}
        ListFooterComponent={
          <BackButton onPress={handleBackPress}>
            <BackButtonText>Retour</BackButtonText>
          </BackButton>
        }
      />
    </View>
  );
};

export default BookList;
