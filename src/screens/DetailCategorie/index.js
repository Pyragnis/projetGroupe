import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { firebase } from '../../config/FirebaseConfig';
import { useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';
import { Alert } from 'react-native';

const Container = styled.View`
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const BackButton = styled.TouchableOpacity`
  background-color: #ccc;
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const BookCard = styled.TouchableOpacity`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const BookTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: center;
`;

const BookImage = styled.Image`
  width: 100px;
  height: 150px;
  margin-right: 10px;
  margin-bottom: 5px;
  align-self: center;
`;

const RemoveButton = styled.TouchableOpacity`
  background-color: red;
  padding: 10px;
  border-radius: 5px;
  margin-top: 5px;
  
`;

const RemoveButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;
// Import des styles et des composants
const BookContainer = styled.View`
  flex-direction: row;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const BookDetails = styled.View`
  flex: 1;
`;

const RemoveButtonContainer = styled.View`
  justify-content: flex-end;
  align-items: center;
`;

const DetailCategorie = ({ navigation }) => {
  const [category, setCategory] = useState(null);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute();

  useEffect(() => {
    const categoryId = route.params.categoryId;
    setIsLoading(true);

    // Récupérer la catégorie et les livres associés
    const categoryRef = firebase.firestore().collection('categories').doc(categoryId);
    const booksRef = firebase.firestore().collection('livres');
    
    async function getCategory() {
      try {
        const categoryDoc = await categoryRef.get();
        const categoryData = categoryDoc.data();
        
        setCategory(categoryData);
        
        // Récupérer tous les livres
        const booksQuerySnapshot = await booksRef.get();
        const booksData = booksQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBooks(booksData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    
    getCategory();
  }, [route.params.categoryId]);

  const handleRemoveBook = (bookId) => {
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir supprimer ce livre ? Il sera supprimer de la catégorie mais pas de votre blibliothèque',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          onPress: () => {
            const categoryId = route.params.categoryId;
            const categoryRef = firebase.firestore().collection('categories').doc(categoryId);
            categoryRef.update({
              books: firebase.firestore.FieldValue.arrayRemove(bookId)
            }).then(() => {
              setBooks(currentBooks => currentBooks.filter(book => book.id !== bookId));
              firebase.firestore().collection('livres').doc(bookId).delete()
                .then(() => {
                  console.log('livres deleted successfully');
                })
                .catch((error) => {
                  console.log('Error deleting livres :', error);
                });
            }).catch(error => {
              console.log(error);
            });
          },
        },
      ],
      { cancelable: true },
    );
  };
  


  return (
    <Container>
      {isLoading && <Text>Loading...</Text>}
      {!isLoading && category && (
        <>
          <Title>{category.name}</Title>
          {books.length > 0 ? (
            books
              .filter(book => category.books?.includes(book.id))
              .map(book => (
                <BookContainer key={book.id}>
                  <BookImage source={{ uri: book.image }} defaultSource={require('../../../public/asset/image.jpg')} />

                  <BookDetails>
                    <BookTitle>{book.title}</BookTitle>
                    {/*... autres détails du livre */}
                  </BookDetails>
                  <RemoveButtonContainer>
                    <RemoveButton onPress={() => handleRemoveBook(book.id)}>
                      <RemoveButtonText>supprimer</RemoveButtonText>
                    </RemoveButton>
                  </RemoveButtonContainer>
                </BookContainer>
              ))
          ) : (
            <Text>No books in this category yet.</Text>
          )}
        </>
        )}
        <BackButton onPress={() => navigation.goBack()}>
          <ButtonText>revenir au Categories</ButtonText>
        </BackButton>
      </Container>
    );
  };

  export default DetailCategorie;
          
