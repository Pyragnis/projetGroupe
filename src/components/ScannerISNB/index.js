import React, { useState } from 'react';
import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
import axios from 'axios';

const ScannerISBN = ({ navigation }) => {
  const [scanned, setScanned] = useState(false);
  const [bookData, setBookData] = useState({});

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);

    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${data}`);
      const book = response.data.items[0].volumeInfo;
      setBookData({
        title: book.title,
        description: book.description,
        image: book.imageLinks ? book.imageLinks.thumbnail : null, // vérifie si l'image existe
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handlePress = () => {
    navigation.goBack(); // retourne à la page précédente
  };

  return (
    <Container>
      <TopBar>
        <Button onPress={handlePress}>
          <ButtonText>Retour</ButtonText>
        </Button>
      </TopBar>
      <Camera
        type={RNCamera.Constants.Type.back}
        onBarCodeRead={scanned ? undefined : handleBarCodeScanned}
      />
      {scanned && (
        <BookInfo>
          {bookData.image !== null && <BookImage source={{ uri: bookData.image }} />}
          <BookTitle>{bookData.title}</BookTitle>
          <BookDescription>{bookData.description}</BookDescription>
          <Button onPress={handlePress}>
            <ButtonText>Retour</ButtonText>
          </Button>
        </BookInfo>
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const TopBar = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  padding: 16px;
`;

const Camera = styled(RNCamera)`
  flex: 1;
`;

const BookInfo = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  padding: 16px;
`;

const BookImage = styled.Image`
  width: 100px;
  height: 150px;
  margin-right: 16px;
`;

const BookTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const BookDescription = styled.Text`
  font-size: 16px;
`;

const Button = styled.TouchableOpacity`
  background-color: green;
  padding: 10px;
  border-radius: 99px;
  margin: 14px;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  color: white;
`;

export default ScannerISBN;
