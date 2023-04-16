import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from 'react-navigation-stack';


import Navbar from '../../components/Navbar';

const Index = () => {
  const { t, i18n } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Code pour activer/désactiver le mode sombre
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  return (
    <View style={{ flex: 1 }}>
      <Navbar title={t('home')} />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
        <TouchableOpacity onPress={toggleDarkMode}>
          <Icon name={isDarkMode ? 'moon-waning' : 'white-balance-sunny'} size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleLanguage}>
          <Text style={{ fontSize: 18 }}>{t('lang')}</Text>
        </TouchableOpacity>
      </View>
      {/* Le reste du contenu de votre page d'accueil */}
    </View>
  );
};

const AppNavigator = createStackNavigator(
  {
    Home: Index, // Changed screen name and component to Index
  },
  {
    headerMode: 'none', // Hides the default header for the stack navigator
  }
);

export default AppNavigator;
