import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import { firebase } from '../../config/FirebaseConfig';
import { SearchBar } from 'react-native-elements';

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

const Footer = styled.View`
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'green',
  paddingVertical: 10,
  paddingHorizontal: 20,
`;

const BackIcon = styled.Image`
  width: 20px;
  height: 20px;
`;

const BookList = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('livres')
      .onSnapshot((querySnapshot) => {
        const books = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBooks(books);
        setFilteredBooks(books);
      });
    return () => unsubscribe();
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = books.filter((book) => book.title.toLowerCase().includes(text.toLowerCase()));
    setFilteredBooks(filtered);
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
      <SearchBar
        placeholder="Rechercher un livre..."
        onChangeText={handleSearch}
        value={searchQuery}
        inputContainerStyle={{ backgroundColor: 'green' }}
      />
      
    </View>

  );
};

export default BookList;
