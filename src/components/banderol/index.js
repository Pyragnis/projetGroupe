import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";

//Renvoie une image
const Bandeau = ({source}) => {
  return (
    <ImageStyled
      source={source}
    />
  );
};

const ImageStyled = styled(Image)`
  resizeMode: stretch;
  width: 100%;
  height: 12%;
  bottom: 10px;
`;

export default Bandeau;