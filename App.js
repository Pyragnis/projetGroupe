import React from 'react';
import { Provider } from 'react-redux';
import Routes from './src/config/routes';
import { store } from './src/config/store';
import ThemeContext, { ThemeProvider, lightTheme } from '../projetGroupe/src/components/ThemeContext';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';

const App = () => {
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ theme }) => (
          <StyledSafeAreaView backgroundColor={theme.backgroundColor}>
            <StatusBar style={theme === lightTheme ? 'dark' : 'light'} backgroundColor={theme.backgroundColor} />
            <Provider store={store}>
              <Routes />
            </Provider>
          </StyledSafeAreaView>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
};

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.backgroundColor};
`;

export default App;
