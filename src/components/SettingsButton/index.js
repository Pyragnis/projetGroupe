import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setTheme } from '../../actions/themeActions';
import { setLanguage } from '../../actions/languageActions';

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
    <Button
      title="Settings"
      onPress={() => {
        navigation.navigate('Settings', {
          handleThemeChange: handleThemeChange,
          handleLanguageChange: handleLanguageChange,
        });
      }}
      buttonStyle={styles.button}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    color: '#000',
  },
});

export default SettingsButton;
