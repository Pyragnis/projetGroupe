import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setTheme } from '../../actions/themeActions';
import { setLanguage } from '../../actions/languageActions';
import styled from 'styled-components/native';

const SettingsButton = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleThemeChange = (theme) => {
    dispatch(setTheme(theme));
  };

  const handleLanguageChange = (language) => {
    dispatch(setLanguage(language));
  };

  return (
    <RoundButton 
      onPress={() => {
        navigation.navigate('Settings', {
          handleThemeChange: handleThemeChange,
          handleLanguageChange: handleLanguageChange,
        });
      }}
    >
      <ButtonText>Settings</ButtonText>
    </RoundButton>
  );
};

const RoundButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 70px;
  height: 32px;
  border-radius: 25px;
  background-color: green;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export default SettingsButton;
