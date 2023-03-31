import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../../config/axiosInstance';
import React, {useState} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import styled from 'styled-components';
import Bandeau from '../../components/banderol';

const Login = ({onLogin}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const [inputs, setInputs] = React.useState({
    email: '',
    password: '',
  });

  const handleLogin = () => {
    setLoading(true);
    setError(null);
    axiosInstance({
      method: 'POST',
      url: 'https://login.hikkary.com/users/login',
      data: {
        username: inputs.email,
        password: inputs.password,
      },
    })
      .then(res => {
        //console.log(res.headers['x-access-token']);
        AsyncStorage.setItem('token', res.headers['x-access-token'])
          .then(() => {
            onLogin(); // Ajoutez cette ligne pour appeler la fonction onLogin
            navigation.navigate('Home');
          })
          .catch(err => {
            //console.log('🚀 ~ file: login.js:6 ~ Login ~ err', err);
          });
      })
      .catch(err => {
        setError(err.message);
        //console.log('🚀 ~ file: login.js:6 ~ Login ~ err', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  return (
    <Container>
      <Title>Connexion</Title>
      <Spinner visible={loading} />
      <Bandeau/>
        <TextInputStyled
          placeholder="Email"
          value={inputs.email}
          onChangeText={text => setInputs({...inputs, email: text})}
        />
        <TextInputStyled
          placeholder="Password"
          value={inputs.password}
          secureTextEntry={true}
          onChangeText={text => setInputs({...inputs, password: text})}
        />
      <Touchable onPress={handleLogin}>
        <StyledText>Se connecter</StyledText>
      </Touchable>
      {/*{error && <ErrorText>{error}</ErrorText>}  afficher le message d'erreur s'il existe */}
    </Container>
  );
};

const Title = styled.Text`
  font-size: 30px;
  margin-bottom: 30px;
`;

const TextInputStyled = styled.TextInput`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 999px;
`;

const Touchable = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: green;
  justify-content: center;
  align-items: center;
  border-radius: 999px;
`;

const StyledText = styled.Text`
  color: #fff;
  font-size: 18px;
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 20px;
`;

export default Login;