import React, { useState } from "react";
import Navbar from "../component/Navbar";
import styled from "styled-components";
import Background from "../assets/Background.png";
import TaroEx1 from "../assets/TaroEx1.png";
import TaroEx2 from "../assets/TaroEx2.png";
import TaroEx3 from "../assets/TaroEx3.png";
import BackOfCard from "../assets/BackOfCard.png";
import NextButton from "../assets/NextButton.png";
import { motion, AnimatePresence } from "framer-motion";

const BackgroundColor = styled.div`
  background: #000;
  width: 100vw;
  height: 100vh;
  padding-top: 10px;
`;

const BackgroundWrapper = styled.div`
  position: relative; // 자식 요소를 절대 위치로 배치하기 위한 설정
  width: 100%;
  height: 89vh;
  @media (max-width: 1300px), (max-height: 650px) {
    width: 85%;
    height: 89vh;
  }
`;

const BackgroundImg = styled.img`
  width: 100%;
  height: 100%;
`;

const Inside = styled.div`
  width: 1500px;
  margin-left: auto;
  margin-right: auto;
`;

const CardBackground = styled.div`
  width: 8.75rem;
  height: 15rem;
  border-radius: 0.9375rem;
  background: #b99e6f;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1300px), (max-height: 650px) {
    width: 8rem;
    height: 14rem;
  }
`;

const TaroEx = styled.img`
  width: 7.72438rem;
  height: 13.90388rem;

  @media (max-width: 1300px), (max-height: 650px) {
    width: 7rem;
    height: 13rem;
  }
`;

const Cards = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  gap: 6.5rem;
  top: 13%;
  left: 25%;

  @media (max-width: 1300px), (max-height: 650px) {
    gap: 4rem;
    left: 30%;
  }
`;

const BackcardBackground = styled(motion.div)`
  width: 139.343px;
  height: 238.254px;
  border-radius: 15px;
  background: #b99e6f;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  cursor: pointer;

  @media (max-width: 1300px), (max-height: 650px) {
    width: 7rem;
    height: 11rem;

    img {
      width: 6.5rem;
      height: 10.5rem;
    }
  }
`;

const StackedCardsContainer = styled(motion.div)`
  position: relative;
  height: 238.254px; // 자식 컨테이너(BackcardBackground)와 같은 높이
  width: 100%; // 또는 전체 카드가 겹치는 너비에 맞게 조정
  bottom: 45%;
  left: 65%;
  @media (max-width: 1300px), (max-height: 650px) {
    bottom: 40%;
    left: 72%;
  }
`;

const NextBtn = styled.button`
  border: none;
  background: none;
  width: 3.75rem;
  height: 3.75rem;
  background-image: url(${NextButton});
  position: absolute;
  right: 8rem;
  bottom: 10.5rem;
  cursor: pointer;

  @media (max-width: 1300px), (max-height: 650px) {
    width: 3.5rem;
    height: 4rem;
    right: 5rem;
    bottom: 10.5rem;
  }
`;

const BeforeBtn = styled.button`
  border: none;
  background: none;
  width: 3.75rem;
  height: 3.75rem;
  background-image: url(${NextButton});
  position: absolute;
  left: 8%;
  bottom: 10.5rem;
  cursor: pointer;
  transform: rotate(180deg);

  @media (max-width: 1300px), (max-height: 650px) {
    width: 3.5rem;
    height: 4rem;
  }
`;

const rowVariants = {
  hidden: (isBack: boolean) => ({
    x: isBack ? -window.outerWidth - 10 : window.outerWidth + 10,
    transition: {
      duration: 0.4,
    },
  }),
  visible: {
    x: 0,
    transition: {
      duration: 0.4,
    },
  },
  exit: (isBack: boolean) => ({
    x: isBack ? window.outerWidth + 10 : -window.outerWidth - 10,
    transition: {
      duration: 0.4,
    },
  }),
};

const CardSelect = () => {
  const NumberOfCards = 22; // 겹칠 카드의 수
  const Overlap = -30; // 카드 겹침 정도
  const [count, setCount] = useState(0); //몇번째 슬라이드인지
  const [back, setBack] = useState(false); //뒤로 갈지 앞으로 갈지
  const incraseIndex = () => {
    setCount((prev) => (prev === 3 ? 3 : prev + 1));
    setBack(false);
    console.log(count);
  };
  const decraseIndex = () => {
    setCount((prev) => (prev === 0 ? 0 : prev - 1));
    setBack(true);
    console.log(count);
  };
  const consoleIndex = (index: number, count: number) => {
    console.log(count, index);
  };

  return (
    <BackgroundColor>
      <Inside>
        <Navbar />
        <BackgroundWrapper>
          <BackgroundImg src={Background} alt="Background" />
          <Cards>
            <CardBackground>
              <TaroEx src={TaroEx1} />
            </CardBackground>

            <CardBackground>
              <TaroEx src={TaroEx2} />
            </CardBackground>
            <CardBackground>
              <TaroEx src={TaroEx3} />
            </CardBackground>
          </Cards>
          <AnimatePresence mode="wait" custom={back}>
            {count === 3 ? (
              <StackedCardsContainer
                custom={back}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={count}
              >
                {Array.from({ length: 18 }).map((_, index) => (
                  <BackcardBackground
                    key={index}
                    onClick={() => consoleIndex(index, count)}
                    style={{
                      left: `${index * Overlap}px`,
                      zIndex: NumberOfCards - index,
                    }}
                  >
                    <img src={BackOfCard} alt="Card back" />
                  </BackcardBackground>
                ))}
              </StackedCardsContainer>
            ) : (
              <StackedCardsContainer
                custom={back}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={count}
              >
                {Array.from({ length: NumberOfCards }).map((_, index) => (
                  <BackcardBackground
                    key={index}
                    onClick={() => consoleIndex(index, count)}
                    style={{
                      left: `${index * Overlap}px`,
                      zIndex: NumberOfCards - index,
                    }}
                  >
                    <img src={BackOfCard} alt="Card back" />
                  </BackcardBackground>
                ))}
              </StackedCardsContainer>
            )}
          </AnimatePresence>

          <NextBtn onClick={incraseIndex}></NextBtn>
          <BeforeBtn onClick={decraseIndex}></BeforeBtn>
        </BackgroundWrapper>
      </Inside>
    </BackgroundColor>
  );
};

export default CardSelect;
