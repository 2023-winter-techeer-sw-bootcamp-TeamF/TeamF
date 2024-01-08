import React from "react";
import styled from "styled-components";
import LandingBackgroundImg from "../assets/LandingBackground3.png";
import BackOfCard from "../assets/BackOfCard.png";
import LandingSpaceImg from "../assets/LandingSpace.png";

const Background = styled.div`
  background: #000;
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const LandingBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${LandingBackgroundImg});
  mix-blend-mode: hard-light;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackofCards = styled.div`
  width: 128.513px;
  height: 227.424px;
  background: url(${BackOfCard});
`;

const Name = styled.p`
  width: 527px;
  color: #ecb973;

  text-align: center;
  font-family: Cinzel;
  font-size: 74px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
`;

function Landing() {
  return (
    <>
      <Background>
        <LandingBackground>
          <Name>tarot counseling</Name>
          <div>
            <BackofCards />
          </div>
        </LandingBackground>
      </Background>
    </>
  );
}

export default Landing;
