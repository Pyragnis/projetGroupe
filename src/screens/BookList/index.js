import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Modal } from 'react-native';
import styled from 'styled-components/native';
import { firebase } from '../../config/FirebaseConfig';
import { Alert } from 'react-native';

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

const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const AddToCategoryButton = styled.TouchableOpacity`
  background-color: #4CAF50;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
`;
const Supp = styled.TouchableOpacity`
  background-color: red;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
`;

const AddToCategoryButtonText = styled.Text`
  color: white;
  font-weight: bold;
  text-align: center;
`;

//modal style
const ModalContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top:15%;
`;

const ModalInnerContent = styled.View`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
`;

const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #008000;
  margin-top:10%;
`;

const CategoryButton = styled.TouchableOpacity`
  margin-bottom: 10px;
  background-color: #008000;
  padding: 10px 20px;
  border-radius: 20px;
  align-items: center;
`;

const CategoryButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
`;

const CancelButton = styled.TouchableOpacity`
  margin-top: 20px;
`;

const CancelButtonText = styled.Text`
  color: red;
`;
const ModalCloseIcon = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const ModalCloseIconText = styled.Text`
  font-size: 20px;
  color: #008000;
`;



const BookList = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);


  useEffect(() => {
    const unsubscribeBooks = firebase.firestore().collection('livres')
      .onSnapshot((querySnapshot) => {
        const books = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBooks(books);
      });
    const unsubscribeCategories = firebase.firestore().collection('categories')
      .onSnapshot((querySnapshot) => {
        const categories = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCategories(categories);
      });
    return () => {
      unsubscribeBooks();
      unsubscribeCategories();
    };
  }, []);

  

  const handleAddToCategoryPress = (bookId) => {
    setSelectedBookId(bookId);
    setModalVisible(true);
  };
  

  const handleCategoryPress = async (categoryId) => {
    try {
      const categoryRef = firebase.firestore().collection('categories').doc(categoryId);
      const categoryData = await categoryRef.get();
      const newBooks = [...categoryData.data().books, selectedBookId]; // Utilisation de selectedBookId
      await categoryRef.update({ books: newBooks });
      console.log('Book added to category:', categoryId);
      setModalVisible(false); // Fermer la modal après la mise à jour de la catégorie
    } catch (error) {
      console.log(error);
    }
  };
  const deletelivre = (bookid) => {
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir supprimer ce livre ? il ne sera plus present dans votre blibliothèque ni dans vos catégorie',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          onPress: () => {
            firebase.firestore().collection('livres').doc(bookid).delete()
              .then(() => {
                console.log('livres deleted successfully');
              })
              .catch((error) => {
                console.log('Error deleting livres :', error);
              });
          },
        },
      ],
      { cancelable: true },
    );
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
      <AddToCategoryButton onPress={() => handleAddToCategoryPress(item.id)}>
        <AddToCategoryButtonText>Ajouter à une catégorie</AddToCategoryButtonText>
      </AddToCategoryButton>
      <Supp onPress={() => deletelivre(item.id)}>
        <AddToCategoryButtonText>supprimer livre</AddToCategoryButtonText>
      </Supp>
    </BookCard>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={books}
        renderItem={renderBook}
        keyExtractor={(item) => item.id}
      />
      <BackButton onPress={() => navigation.goBack()}>
        <ButtonText>Back</ButtonText>
      </BackButton>

      <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible && selectedBookId !== null} // Vérification de selectedBookId
  onRequestClose={() => {
    setModalVisible(false);
  }}
>

  <ModalContent>
    <ModalInnerContent>
      <ModalCloseIcon onPress={() => setModalVisible(false)}>
        <ModalCloseIconText>X</ModalCloseIconText>
      </ModalCloseIcon>
      <ModalTitle>Choisir une catégorie</ModalTitle>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <CategoryButton onPress={() => handleCategoryPress(item.id)}>
            <CategoryButtonText>{item.name}</CategoryButtonText>
          </CategoryButton>
        )}
        keyExtractor={(item) => item.id}
      />
      <CancelButton onPress={() => setModalVisible(false)}>
        <CancelButtonText>Annuler</CancelButtonText>
      </CancelButton>
    </ModalInnerContent>
  </ModalContent>
</Modal>
    </View>
  );
};
export default BookList;
