import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import "../../config/translation";
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = ({ route }) => {
  const [theme, setTheme] = useState('system');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');

  const handleThemeChange = async (value) => {
    if (value) {
      setTheme('dark');
      await AsyncStorage.setItem('theme', 'dark');
      route.params.handleThemeChange('dark');
    } else {
      setTheme('light');
      await AsyncStorage.setItem('theme', 'light');
      route.params.handleThemeChange('light');
    }
  };

  const { t, i18n } = useTranslation();

  AsyncStorage.getItem('theme').then((value) => {
    if (value) {
      setTheme(value);
    }
  });

  useEffect(() => {
    if (theme === 'dark') {
      setBackgroundColor('#1E1E1E');
    } else {
      setBackgroundColor('#FFFFFF');
    }
  }, [theme]);

  return (
    <Container backgroundColor={backgroundColor}>
      <Section>
        <SectionTitle theme={theme}>{t('theme')}</SectionTitle>
        <SwitchContainer>
          <SwitchLabel theme={theme}>{t('light')}</SwitchLabel>
          <Switch
            value={theme === 'dark'}
            onValueChange={handleThemeChange}
          />
          <SwitchLabel theme={theme}>{t('dark')}</SwitchLabel>
        </SwitchContainer>
      </Section>
      <Section>
        <SectionTitle theme={theme}>{t('language')}</SectionTitle>
        <RadioButtonsContainer>
          <RadioButton
            selected={i18n.language === 'fr'}
            onPress={() => handleLanguageChange('fr')}
          >
            <RadioButtonLabel theme={theme}>{t('french')}</RadioButtonLabel>
          </RadioButton>
          <RadioButton
            selected={i18n.language === 'en'}
            onPress={() => handleLanguageChange('en')}
          >
            <RadioButtonLabel theme={theme}>{t('english')}</RadioButtonLabel>
          </RadioButton>
        </RadioButtonsContainer>
      </Section>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const Section = styled.View`
  margin-bottom: 20px;
`;

const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${({ theme }) => (theme === 'dark' ? '#FFFFFF' : '#000000')};
`;

const SwitchContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Switch = styled.Switch``;

const SwitchLabel = styled.Text`
  margin-horizontal: 10px;
  color: ${({ backgroundColor, theme }) =>
    theme === 'dark' ? '#FFFFFF' : backgroundColor === '#1E1E1E' ? '#FFFFFF' : '#000000'};
`;

const RadioButtonsContainer = styled.View`
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const RadioButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const RadioButtonLabel = styled.Text`
  margin-left: 10px;
  font-size: 16px;
  color: ${({ theme }) => (theme === 'dark' ? '#FFFFFF' : '#000000')};
`;


export default Settings;
