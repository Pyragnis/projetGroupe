import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../actions/addCategory';
import { View, Text, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Container = styled.View`
  flex: 1;
  background-color: #192734;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-left: 10px;
`;

const InputContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const InputLabel = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin-bottom: 10px;
`;

const Input = styled.TextInput`
  height: 40px;
  width: 80%;
  background-color: white;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 10px;
`;

const AddButton = styled.TouchableOpacity`
  background-color: #4CAF50;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  text-align: center;
`;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  left: 20px;
`;

const AlertContainer = styled.View`
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  margin: 20px;
  justify-content: center;
  align-items: center;
`;

const SuccessText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #4CAF50;
`;

const CategoryForm = () => {
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = () => {
    dispatch(addCategory(categoryName));
    setCategoryName('');
    setShowAlert(true);
  };

  return (
    <Container>
      <ImageBackground source={require('../../../public/asset/logo1.png')} style={{ flex: 1 }}>
        <Header>
          <Icon name="list-ul" size={24} color="white" />
          <Title>Categories</Title>
        </Header>
        <InputContainer>
          <InputLabel>Add a category</InputLabel>
          <Input
            onChangeText={(text) => setCategoryName(text)}
            value={categoryName}
            placeholder="Enter category name"
          />
          <AddButton onPress={handleSubmit}>
            <ButtonText>Add category</ButtonText>
          </AddButton>
        </InputContainer>
        {showAlert &&
          <AlertContainer>
              <Icon name="check-circle" size={50} color="#4CAF50" />
             <SuccessText>Category added successfully!</SuccessText>
          </AlertContainer>
        }
        <TouchableOpacity style={{ position: 'absolute', bottom: 20, left: 20 }} onPress={() => setShowAlert(false)}>
  <Icon name="arrow-left" size={30} color="#fff" />
</TouchableOpacity> 
      </ImageBackground>
    </Container>
  );
};

export default CategoryForm;
