import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import axiosInstance from '../../config/axiosInstance';
import SplashScreen from '../../components/SplashScreen';
import Bandeau from '../../components/banderol';
import BackgroundImage from '../../components/PersonnalBackground';
import styled from 'styled-components';
import { signIn } from '../../actions/firebaseAuth';

const Login = ({onLogin}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const [inputs, setInputs] = React.useState({
    email: '',
    password: '',
  });

    // This useEffect hook is used to simulate the time it takes to authenticate the user.
    React.useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }, []);

  const handleLogin = () => {
    setError(null);
    firebase
    .auth()
    .signInWithEmailAndPassword(inputs.email, inputs.password)
    .then((userCredential) => {
      // Dispatch the action to update the auth state
      dispatch(signIn(userCredential.user.uid));
      navigation.navigate('Home');
    })
    .catch((error) => {
      setError(error.message);
    });
};
  
  return (
    <BackgroundImage source={require('../../../public/LogoF-vert.png')}>
      <Container>
      <Title>Connexion</Title>
        <Bandeau source={require('../../../public/LogoN-vert.png')} />
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
        {/*{error && <ErrorText>{error}</ErrorText>} afficher le message d'erreur s'il existe */}
      </Container>
    </BackgroundImage>
    );
};

const Title = styled.Text`
  font-size: 30px;
  margin-bottom: 30px;
`;

const TextInputStyled = styled.TextInput`
  width: 100%;
  padding: 10px;
  background-color: white;
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
  color: black;
  font-size: 18px;
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export default Login;