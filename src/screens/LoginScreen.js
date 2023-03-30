import React, { useState } from 'react';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Bandeau from '../components/banderol';

//AsyncStorage


//formulaire de login sans token ni BDD
const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username.length >= 0 && password.length >= 0) {
      if (username.length >= 3){
        if (password.length >= 8) {
          if (username === 'admin'){
            if (password === 'password') {
              navigation.navigate('Home');
            }else {
              setError('mot de passe incorrect');
            }
          } else {
            setError('Identifiant incorrect');
          }
        } else {
          setError('Le mot de passe n\'est pas assez long');
        }
      } else {
        setError('L\'identifiant n\'est pas assez long');
      }
    } else {
      setError('Veuillez remplir tous les champs');
    }
  };

  //render
  return (
    <Container>
      <Title>Connexion</Title>
      <Bandeau/>
      {error ? <Error>{error}</Error> : null}
      <Input
        placeholder="Nom d'utilisateur"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <Input
        placeholder="Mot de passe"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <Button onPress={handleLogin}>
        <ButtonText>Se connecter</ButtonText>
      </Button>
    </Container>
  );
};

  // Creation des styled-components
  const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    padding: 20px;
  `;

  const Title = styled.Text`
    font-size: 30px;
    margin-bottom: 30px;
  `;

  const Input = styled.TextInput`
    width: 100%;
    height: 50px;
    padding: 10px;
    margin-bottom: 10px;
    border-width: 1px;
    border-color: #ccc;
    border-radius: 999px;
  `;

  const Button = styled.TouchableOpacity`
    width: 100%;
    height: 50px;
    background-color: green;
    justify-content: center;
    align-items: center;
    border-radius: 999px;
  `;

  const ButtonText = styled.Text`
    color: #fff;
    font-size: 18px;
  `;

  const Error = styled.Text`
    color: red;
    margin-bottom: 10px;
  `;

export default LoginScreen;
