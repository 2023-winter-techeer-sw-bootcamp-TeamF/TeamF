import styled from "styled-components";
import LandingBackgroundImg from "../assets/LandingBackground3.png";
import BackOfCard from "../assets/LandingCard.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
  gap: 3rem;
`;

const BackofCardsLeft = styled(motion.div)`
  width: 27.8125rem;
  height: 30.41931rem;
  position: absolute;
  z-index: 3;
  left: 23%;
`;

const BackofCardsRight = styled(motion.div)`
  width: 27.8125rem;
  height: 30.41931rem;
  position: absolute;
  z-index: 3;
  transform: scaleX(-1);
  right: 23%;
`;

const Name = styled.p`
  width: 32.9375rem;
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
  margin-bottom: 16rem;
`;

const StartButton = styled(motion.button)`
  width: 13.1875rem;
  height: 3rem;
  border-radius: 7.5rem;
  border: 0.125rem solid #c38017;
  background: rgba(195, 128, 23, 0);
  cursor: pointer;
  position: sticky;
  z-index: 11;
  &:hover {
    // opacity: 0.7;
    border-color: #ffbf00;
    font-weight: bold;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
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
  &:hover {
    color: #ffbf00;
  }
`;

const LandingBackgroundImage = styled.img`
  width: 100%;
  height: 100%;
`;

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
            <StartButton whileTap={{ scale: 0.85 }}>
              <StartText>START</StartText>
            </StartButton>
          </Link>
        </LandingThings>
        <BackofCardsLeft
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            x: [0, 3],
            y: [30, 10, -10],
            rotate: 5,
          }}
          transition={{
            duration: 1.5,
            ease: "linear",
          }}
        >
          <CardImg src={BackOfCard} />
        </BackofCardsLeft>
        <BackofCardsRight
          initial={{
            scaleX: -1,
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            rotate: 7,
            x: [0, 3],
            y: [30, 10, -10],
          }}
          transition={{
            duration: 1.5,
            ease: "linear",
          }}
        >
          <CardImg src={BackOfCard} />
        </BackofCardsRight>
      </Background>
    </>
  );
}

export default Landing;
