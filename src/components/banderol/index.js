import React from "react";
import styled from "styled-components/native";
import { Image } from "react-native";

//Renvoie une image dans l ecran de login
const Bandeau = () => {
  return (
    <ImageStyled
      source={require('../../../public/livres.jpg')}
    />
  );
};

const ImageStyled = styled(Image)`
  resizeMode: stretch;
  width: 60%;
  height: 30%;
  bottom: 10px;
`;

export default Bandeau;
