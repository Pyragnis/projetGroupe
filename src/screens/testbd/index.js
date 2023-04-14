import React from 'react';
import { Button, View } from 'react-native';
import { firebase } from '../../config/FirebaseConfig';

const addBookToFirestore = async (bookData) => {
  try {
    const booksRef = firebase.firestore().collection('books');
    await booksRef.add(bookData);
    console.log('Book added to Firestore!');
  } catch (error) {
    console.error(error);
  }
};

const testbd = () => {
  const handleAddBook = () => {
    const book = {
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      publishedYear: 1951,
      genre: 'Bildungsroman',
    };
    addBookToFirestore(book);
  };

  return (
    <View>
      <Button title="Add Book to Firestore" onPress={handleAddBook} />
    </View>
  );
};

export default testbd;
