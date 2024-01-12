import React from "react";
import styled from "styled-components";
import LandingBackgroundImg from "../assets/LandingBackground3.png";
import BackOfCard from "../assets/LandingCard.png";
import { Link } from "react-router-dom";

const Background = styled.div`
  background: #000;
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LandingBackground = styled.div`
  width: 90rem;
  height: 60rem;
  mix-blend-mode: hard-light;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LandingThings = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
`;

const BackofCardsLeft = styled.div`
  width: 27.8125rem;
  height: 30.41931rem;
  position: absolute;
  z-index: 3;
  left: 23%;
`;
const BackofCardsRight = styled.div`
  width: 27.8125rem;
  height: 30.41931rem;
  position: absolute;
  z-index: 3;
  transform: scaleX(-1);
  right: 23%;
`;

const Name = styled.p`
  width: 527px;
  color: #ecb973;

  text-align: center;
  font-family: "Cinzel", serif;
  font-size: 4.625rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
  position: relative;
  z-index: 4;
  margin-bottom: 12rem;
`;

const StartButton = styled.button`
  width: 13.1875rem;
  height: 3rem;
  border-radius: 7.5rem;
  border: 2px solid #c38017;
  background: rgba(195, 128, 23, 0);
  cursor: pointer;
  z-index: 11;
`;

const StartText = styled.p`
  color: #c38017;
  font-family: Inter;
  font-size: 1.1875rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.083125rem;
  text-transform: uppercase;
`;

const LandingBackgroundImage = styled.img`
  width: 100%;
  height: 100%;
`

const CardImg = styled.img`
  height: 100%;
  width: 100%;
`;

function Landing() {
  return (
    <>
      <Background>
        <LandingBackground>
          <LandingBackgroundImage src={LandingBackgroundImg} />
        </LandingBackground>
        <LandingThings>
          <Name>TAIROT</Name>
          <Link to="/fortuneselect">
            <StartButton>
              <StartText>START</StartText>
            </StartButton>
          </Link>
        </LandingThings>
        <BackofCardsLeft>
          <CardImg src={BackOfCard} />
        </BackofCardsLeft>
        <BackofCardsRight>
          <CardImg src={BackOfCard} />
        </BackofCardsRight>
      </Background>
    </>
  );
}

export default Landing;
