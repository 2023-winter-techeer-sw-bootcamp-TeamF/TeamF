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

const LandingBackground = styled.img`
  width: 90rem;
  height: 60rem;
  mix-blend-mode: hard-light;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LandingThings = styled.div`
  position: absolute;
`;

const BackofCardsLeft = styled.div`
  width: 21.965625rem;
  height: 26.544375rem;
  background: url(${BackOfCard});
  position: absolute;
  z-index: 3;
  left: 23%;
`;
const BackofCardsRight = styled.div`
  width: 21.965625rem;
  height: 26.544375rem;
  background: url(${BackOfCard});
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
  margin-left: 9.5rem;
  cursor: pointer;
  z-index: 11;
  position: fixed;
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

function Landing() {
  return (
    <>
      <Background>
        <LandingBackground src={LandingBackgroundImg}></LandingBackground>
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
