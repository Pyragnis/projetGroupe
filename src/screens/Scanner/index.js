import React from 'react';
import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
import { scanISBN } from '../../actions/scanner';

const ScannerISBN = ({ navigation, scanned, bookData, scanISBN }) => {

  const handleBarCodeScanned = ({ type, data }) => {
    scanISBN(data);
  };

  const handlePress = () => {
    navigation.goBack();
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

const mapStateToProps = (state) => ({
  scanned: state.scanner.scanned,
  bookData: state.scanner.bookData,
});

const mapDispatchToProps = (dispatch) => ({
  scanISBN: (isbn) => dispatch(scanISBN(isbn)),
});

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
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const BookDescription = styled.Text`
  font-size: 16px;
  margin-bottom: 16px;
`;

const Button = styled.TouchableOpacity`
  background-color: #1e90ff;
  padding: 8px 16px;
  border-radius: 4px;
  margin-top: 16px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

export default connect(mapStateToProps, mapDispatchToProps)(ScannerISBN);
