import React from 'react';
import Routes from './src/config/routes';
import { Provider } from 'react-redux';
import { store } from './src/config/store';
import styled from 'styled-components/native';

const App = () => {
  return (
    <StyledSafeAreaView>
      <Provider store={store}>
        <Routes />
      </Provider>
    </StyledSafeAreaView>
  )
};

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

export default App;
