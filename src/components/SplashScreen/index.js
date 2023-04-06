import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData } from '../../actions/SplashScreenLoader';
import styled from 'styled-components/native';

const SplashScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <Container>
      <LoadingImage source={require('../../../public/Loading.png')} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #FFF;
`;

const LoadingImage = styled.Image`
  width: 150px;
  height: 150px;
`;

export default SplashScreen;
