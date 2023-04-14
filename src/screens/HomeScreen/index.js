import React from 'react';
import SettingsButton from '../../components/SettingsButton';
import BackgroundImage from '../../components/PersonnalBackground';
import Bandeau from '../../components/banderol';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native'; // import de useNavigation

const HomeScreen = () => {
  const navigation = useNavigation(); // initialisation de la navigation

  return (
    <BackgroundImage source={require('../../../public/LogoF-violet.png')}>
      <Bandeau source={require('../../../public/LogoN-violet.png')} />
      <Container>
        <Container>
          <Button onPress={() => navigation.navigate('Home')}>
            <ButtonText>Home</ButtonText>
          </Button>
        </Container>
      </Container>
      <SettingsButton onPress={() => navigation.navigate('Settings')} />
    </BackgroundImage>
  ); 
};

// creation des Styled Components
const TextStyled = styled.Text`
  flex:1;
  font-size: 20px;
  text-align: center;
  color: #a6219d;
`;

const Container = styled.View`
  position: absolute;
  top: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
`;

const Button = styled.TouchableOpacity`
  background-color: green;
  padding: 10px;
  border-radius: 99px;
  margin: 14px;
`;

const ButtonText = styled.Text`
  font-size: 16px;
`;

export default HomeScreen;
