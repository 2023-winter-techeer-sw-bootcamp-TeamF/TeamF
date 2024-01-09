import React from "react";
import styled from "styled-components";
import LandingBackgroundImg from "../assets/LandingBackground3.png";
import BackOfCard from "../assets/LandingCards.png";
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

const LandingThings = styled.div`
  position: absolute;
`;

const BackofCardsLeft = styled.div`
  width: 351.45px;
  height: 424.71px;
  background: url(${BackOfCard});
  position: absolute;
  z-index: 3;
  left: 27%;
`;
const BackofCardsRight = styled.div`
  width: 351.45px;
  height: 424.71px;
  background: url(${BackOfCard});
  position: absolute;
  z-index: 3;
  transform: scaleX(-1);
  left: 55%;
`;

const Name = styled.p`
  width: 527px;
  color: #ecb973;

  text-align: center;
  font-family: "Cinzel", serif;
  font-size: 74px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
  position: relative;
  z-index: 4;
  margin-bottom: 12rem;
`;

const StartButton = styled.button`
  width: 211px;
  height: 54px;
  border-radius: 120px;
  border: 2px solid #c38017;
  background: rgba(195, 128, 23, 0);
  margin-left: 9.5rem;
  cursor: pointer;
`;

const StartText = styled.p`
  color: #c38017;
  font-family: Inter;
  font-size: 19px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 1.33px;
  text-transform: uppercase;
`;

function Landing() {
  return (
    <>
      <Background>
        <LandingBackground></LandingBackground>
        <LandingThings>
          <Name>TAIROT</Name>
          <Link to="/fortuneselect">
            <StartButton>
              <StartText>START</StartText>
            </StartButton>
          </Link>
        </LandingThings>
        <BackofCardsLeft />
        <BackofCardsRight />
      </Background>
    </>
  );
}

export default Landing;
