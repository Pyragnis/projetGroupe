import React, { useState } from 'react';
import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
import axios from 'axios';
import { firebase } from '../../config/FirebaseConfig';
import { Alert } from 'react-native';



const ScannerISBN = ({ navigation }) => {
  const [scanned, setScanned] = useState(false);
  const [cameraClicks, setCameraClicks] = useState(0);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
  
    try {
      // Vérifie si le livre existe déjà dans la base de données
      const bookRef = await firebase.firestore().collection('livres').where('isbn', '==', data).get();
      if (!bookRef.empty) {
        // Le livre existe déjà dans la base de données
        Alert.alert('Livre déjà existant', 'Ce livre existe déjà dans votre collection',[{ text: 'OK', onPress: () => navigation.goBack() }]);
        return;
      }
  
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${data}`);
      const book = response.data.items[0].volumeInfo;
  
      // Vérifie si les données sont vides, sinon met 'null'
      const title = book.title || null;
      const description = book.description || null;
      const image = book.imageLinks ? book.imageLinks.thumbnail : null;
      const isbn = data;
  
      // Afficher une boîte de dialogue de confirmation avant d'ajouter le livre à la base de données
      Alert.alert(
        'Confirmation',
        `Voulez-vous ajouter le livre "${title}" à votre collection ?`,
        [
          {
            text: 'Annuler',
            style: 'cancel'
          },
          {
            text: 'Ajouter',
            onPress: async () => {
              // Ajout du livre scanné à Firestore
              await firebase.firestore().collection('livres').add({
                title,
                description,
                image,
                isbn,
              });
              // Afficher un pop-up pour informer l'utilisateur que le livre a été ajouté
              Alert.alert(
                'Livre ajouté',
                'Le livre a été ajouté à votre collection',
                [{ text: 'OK', onPress: () => navigation.navigate('Booklist') }]
              );
            }
          }
        ]
      );
  
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Livre introuvable',
        'Le livre correspondant au code barre scanné n\'a pas été trouvé.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }
  };

  

  const handlePress = () => {
    navigation.goBack(); // retourne à la page précédente
  };

  const handleCameraClick = () => {
    setCameraClicks(cameraClicks + 1);
    if (cameraClicks === 1) {
      handlePress();
    }
  };

  return (
    <Container>
      <Camera
        type={RNCamera.Constants.Type.back}
        onBarCodeRead={scanned ? undefined : handleBarCodeScanned}
        onTouchEnd={handleCameraClick}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const Camera = styled(RNCamera)`
  flex: 1;
`;

export default ScannerISBN;