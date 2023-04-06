import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
//import { Switch } from 'react-native-elements';
//import { useTranslation } from 'react-i18next';

const SettingsScreen = ({ route }) => {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState('system');

  const handleThemeChange = (value) => {
    if (value) {
      setTheme('dark');
      route.params.handleThemeChange('dark');
    } else {
      setTheme('light');
      route.params.handleThemeChange('light');
    }
  };

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    route.params.handleLanguageChange(language);
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('theme')}</Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={handleThemeChange}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('language')}</Text>
        <Switch
          value={i18n.language === 'fr'}
          onValueChange={() => handleLanguageChange('fr')}
        />
        <Switch
          value={i18n.language === 'en'}
          onValueChange={() => handleLanguageChange('en')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default SettingsScreen;
