import React, { useState } from 'react';
import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
import axios from 'axios';
import { fireabase } from '../../config/FirebaseConfig';

const ScannerISBN = ({ navigation }) => {
  const [scanned, setScanned] = useState(false);
  const [cameraClicks, setCameraClicks] = useState(0);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);

    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${data}`);
      const book = response.data.items[0].volumeInfo;

      // Vérifie si les données sont vides, sinon met 'null'
      const title = book.title || null;
      const description = book.description || null;
      const image = book.imageLinks ? book.imageLinks.thumbnail : null;
      const isbn = data;

      // Ajout du livre scanné à Firestore
      await firebase.firestore().collection('livres').add({
        title,
        description,
        image,
        isbn,
      });

    } catch (error) {
      console.error(error);
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
