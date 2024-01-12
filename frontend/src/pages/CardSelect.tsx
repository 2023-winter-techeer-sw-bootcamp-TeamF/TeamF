import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import styled from "styled-components";
import Background from "../assets/Background.png";
import TaroEx1 from "../assets/TaroEx1.png";
import TaroEx2 from "../assets/TaroEx2.png";
import TaroEx3 from "../assets/TaroEx3.png";
import BackOfCard from "../assets/BackOfCard.png";
import NextButton from "../assets/NextButton.png";
import { motion, AnimatePresence } from "framer-motion";
import { chunkArray, shuffleArray } from "../component/ShuffleArray";

const BackgroundColor = styled.div`
  background: #000;
  width: 100vw;
  height: 100vh;
  padding-top: 10px;
`;

const BackgroundWrapper = styled.div`
  position: relative; // 자식 요소를 절대 위치로 배치하기 위한 설정
  width: 79.4671675rem;
  height: 52.94rem;
`;

const BackgroundImg = styled.img`
  width: 100%;
  height: 100%;
`;

const Inside = styled.div`
  width: 81.75rem;
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
`;

const TaroEx = styled.img`
  width: 7.72438rem;
  height: 13.90388rem;
`;

const Cards = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6.5rem;
  margin-left: 5rem;
`;

const BackcardBackground = styled(motion.div)`
  width: 8.7089375rem;
  height: 14.890875rem;
  border-radius: 0.9375rem;
  background: #b99e6f;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  cursor: pointer;
`;

const StackedCardsContainer = styled(motion.div)`
  height: 14.890875rem; // 자식 컨테이너(BackcardBackground)와 같은 높이
  width: 6.25rem; // 또는 전체 카드가 겹치는 너비에 맞게 조정
`;

const NextBtn = styled.button`
  border: none;
  background: none;
  width: 4.25rem;
  height: 3.75rem;
  position: absolute;
  right: 7rem;
  bottom: 10.5rem;
  cursor: pointer;
`;

const BeforeBtn = styled.button`
  border: none;
  background: none;
  width: 4.25rem;
  height: 3.75rem;
  position: absolute;
  left: 8%;
  bottom: 10.5rem;
  cursor: pointer;
  transform: rotate(180deg);
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

const BackOfCardImg = styled.img`
  width: 95%;
  height: 95%;
`;

const CardsWrapper = styled.div`
  position: absolute;
  left: 20%;
  top: 16%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6rem;
`;

const NextBtnImg = styled.img`
  width: 100%;
  height: 100%;
`;

const CardSelect = () => {
  const [NumberOfCards1, setNumberOfCards1] = useState(22); // 1번째 줄 카드 수
  const [NumberOfCards2, setNumberOfCards2] = useState(22); // 2번째 줄 카드 수
  const [NumberOfCards3, setNumberOfCards3] = useState(22); // 3번째 줄 카드 수
  const [NumberOfCardsDelete, setNumberOfCardsDelete] = useState(12); // 4번째 줄 카드 수
  const Overlap = 1.875; // 카드 겹침 정도
  const [count, setCount] = useState(0); //몇번째 슬라이드인지
  const [back, setBack] = useState(false); //뒤로 갈지 앞으로 갈지
  const [chunkNumber, setChunkNumber] = useState<number[][]>([]);

  const incraseIndex = () => {
    setCount((prev) => (prev === 3 ? 0 : prev + 1));
    setBack(false);
  };
  const decraseIndex = () => {
    setCount((prev) => (prev === 0 ? 3 : prev - 1));
    setBack(true);
  };
  const consoleIndex1 = (index: number, count: number) => {
    alert(chunkNumber[count][index]);
    chunkNumber[count].splice(index, 1);
    setNumberOfCards1((prev) => prev - 1);
  };
  const consoleIndex2 = (index: number, count: number) => {
    alert(chunkNumber[count][index]);
    chunkNumber[count].splice(index, 1);
    setNumberOfCards2((prev) => prev - 1);
  };
  const consoleIndex3 = (index: number, count: number) => {
    alert(chunkNumber[count][index]);
    chunkNumber[count].splice(index, 1);
    setNumberOfCards3((prev) => prev - 1);
  };
  const consoleIndex4 = (index: number, count: number) => {
    alert(chunkNumber[count][index]);
    chunkNumber[count].splice(index, 1);
    setNumberOfCardsDelete((prev) => prev - 1);
  };

  useEffect(() => {
    const numbers = Array.from({ length: 78 }, (_, index) => index + 1);
    shuffleArray(numbers);
    setChunkNumber(chunkArray(numbers, 22));
  }, []);
  return (
    <BackgroundColor>
      <Inside>
        <Navbar />
        <BackgroundWrapper>
          <BackgroundImg src={Background} alt="Background" />
          <CardsWrapper>
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
                  {Array.from({ length: NumberOfCardsDelete }).map(
                    (_, index) => (
                      <BackcardBackground
                        key={index}
                        onClick={() => consoleIndex4(index, count)}
                        style={{
                          left: `${index * Overlap}rem`,
                          zIndex: NumberOfCardsDelete - index,
                        }}
                      >
                        <BackOfCardImg src={BackOfCard} alt="Card back" />
                      </BackcardBackground>
                    )
                  )}
                </StackedCardsContainer>
              ) : count === 2 ? (
                <StackedCardsContainer
                  custom={back}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 1 }}
                  key={count}
                >
                  {Array.from({ length: NumberOfCards3 }).map((_, index) => (
                    <BackcardBackground
                      key={index}
                      onClick={() => consoleIndex3(index, count)}
                      style={{
                        left: `${index * Overlap}rem`,
                        zIndex: NumberOfCards3 - index,
                      }}
                    >
                      <BackOfCardImg src={BackOfCard} alt="Card back" />
                    </BackcardBackground>
                  ))}
                </StackedCardsContainer>
              ) : count === 1 ? (
                <StackedCardsContainer
                  custom={back}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 1 }}
                  key={count}
                >
                  {Array.from({ length: NumberOfCards2 }).map((_, index) => (
                    <BackcardBackground
                      key={index}
                      onClick={() => consoleIndex2(index, count)}
                      style={{
                        left: `${index * Overlap}rem`,
                        zIndex: NumberOfCards2 - index,
                      }}
                    >
                      <BackOfCardImg src={BackOfCard} alt="Card back" />
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
                  {Array.from({ length: NumberOfCards1 }).map((_, index) => (
                    <BackcardBackground
                      key={index}
                      onClick={() => consoleIndex1(index, count)}
                      style={{
                        left: `${index * Overlap}rem`,
                        zIndex: NumberOfCards1 - index,
                      }}
                    >
                      <BackOfCardImg src={BackOfCard} alt="Card back" />
                    </BackcardBackground>
                  ))}
                </StackedCardsContainer>
              )}
            </AnimatePresence>
          </CardsWrapper>

          <NextBtn onClick={incraseIndex}>
            <NextBtnImg src={NextButton} />
          </NextBtn>
          <BeforeBtn onClick={decraseIndex}>
            <NextBtnImg src={NextButton} />
          </BeforeBtn>
        </BackgroundWrapper>
      </Inside>
    </BackgroundColor>
  );
};

export default CardSelect;
