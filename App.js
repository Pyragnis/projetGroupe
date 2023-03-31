import React from 'react';
import { Provider } from 'react-redux';
import Routes from './src/config/routes';
import { store } from './src/config/store';
import ThemeContext, { ThemeProvider, lightTheme } from '../../../components/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';

const App = () => {
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ theme }) => (
          <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <StatusBar style={theme === lightTheme ? 'dark' : 'light'} backgroundColor={theme.backgroundColor} />
            <Provider store={store}>
              <Routes />
            </Provider>
          </SafeAreaView>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
`;


export default App;