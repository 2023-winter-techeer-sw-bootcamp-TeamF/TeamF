import React from "react";
import Navbar from "../component/Navbar";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Background from "../assets/Background.png";

const BackgroundContainer = styled.div`
  background-image: url(${Background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
  background-attachment: fixed;
  width: 100vw;
  height: 100vh;
  height: calc(100vh - 70px);
`;

const BackgroundColor = styled.div`
  background: #000;
  width: 100vw;
  height: 100vh;
  padding-top: 70px;
`;
const FortuneSelect = () => {
  return (
    <BackgroundColor>
      <Navbar />
      <BackgroundContainer></BackgroundContainer>
    </BackgroundColor>
  );
};

export default FortuneSelect;
