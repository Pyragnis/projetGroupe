import React from 'react';
import { ImageBackground } from 'react-native';
import styled from 'styled-components/native';

//retourne une image de fond, juste fournis le lien de l'image 
const BackgroundImage = ({ source, children }) => {
  return (
    <Container>
      <ImageBackground source={source} style={styles.image}>
        <Overlay>{children}</Overlay>
      </ImageBackground>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const styles = {
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: 'center',
  },
};

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(255, 255, 255, 0.7);
`;

export default BackgroundImage;
