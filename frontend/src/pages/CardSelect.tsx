import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import styled from "styled-components";
import Background from "../assets/Background.png";
// import TaroEx1 from "../assets/TaroEx1.png";
/*
import TaroEx1 from "../assets/TaroEx1.png";
import TaroEx2 from "../assets/TaroEx2.png";
import TaroEx3 from "../assets/TaroEx3.png";
*/
import { useNavigate } from "react-router-dom";
import BackOfCard from "../assets/BackOfCard.png";
import NextButton from "../assets/NextBtn.png";
import { motion, AnimatePresence } from "framer-motion";
import { chunkArray, shuffleArray } from "../component/ShuffleArray";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import {
  cardNumberAtom1,
  cardNumberAtom2,
  cardNumberAtom3,
} from "../state/atom";

const BackgroundColor = styled.div`
  background: #000;
  width: 100vw;
  height: 100vh;
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
  width: 5.625rem;
  height: 5.125rem;
  position: absolute;
  right: 6.5rem;
  bottom: 13.5rem;
  cursor: pointer;
`;

const BeforeBtn = styled.button`
  border: none;
  background: none;
  width: 5.625rem;
  height: 5.125rem;
  position: absolute;
  left: 8%;
  bottom: 13.5rem;
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
  const numberOfCards = 22; // 1번째 줄 카드 수
  const numberOfCardsDelete = 12; // 4번째 줄 카드 수
  const Overlap = 1.875; // 카드 겹침 정도
  const [count, setCount] = useState(0); //몇번째 슬라이드인지
  const [holdCount, setHoldCount] = useState(0);
  const [back, setBack] = useState(false); //뒤로 갈지 앞으로 갈지
  const [card1, setCard1] = useState("");
  const [card2, setCard2] = useState("");
  const [card3, setCard3] = useState("");

  const [clicknumber, setClickNumber] = useState(-1);
  const [selectedCard, setSelectedCard] = useState<number[][]>([[]]);
  const setCardNumber1 = useSetRecoilState(cardNumberAtom1);
  const setCardNumber2 = useSetRecoilState(cardNumberAtom2);
  const setCardNumber3 = useSetRecoilState(cardNumberAtom3);
  const navigate = useNavigate();

  const incraseIndex = () => {
    setCount((prev) => (prev === 3 ? 0 : prev + 1));
    setBack(false);
  };
  const decraseIndex = () => {
    setCount((prev) => (prev === 0 ? 3 : prev - 1));
    setBack(true);
  };

  const getImage = async (card: number) => {
    try {
      const response = await axios.post("/tarot/card/info", null, {
        params: { card }, // {이름/카드 번호}
      });
      if (holdCount === 0) {
        setCard1(response.data.data.image_url);
        setCardNumber1(card);
      } else if (holdCount === 1) {
        setCard2(response.data.data.image_url);
        setCardNumber2(card);
      } else if (holdCount === 2) {
        setCard3(response.data.data.image_url);
        setCardNumber3(card);

        setTimeout(() => {
          navigate("/process");
        }, 1000);
      }

      setHoldCount((prev) => (prev === 2 ? 3 : prev + 1));
      // setCardNumber(card);
    } catch (error) {
      console.log(error);
    }
  };

  const consoleIndex = (index: number, count: number) => {
    getImage(selectedCard[count][index]);
    const updateCard = [...selectedCard];
    updateCard[count][index] = 0;
    setSelectedCard(updateCard);
    setClickNumber(index);
  };

  useEffect(() => {
    const numbers = Array.from({ length: 78 }, (_, index) => index + 1);
    shuffleArray(numbers);
    setSelectedCard(chunkArray(numbers, 22));
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
                {card1 ? <TaroEx src={card1} /> : null}
              </CardBackground>

              <CardBackground>
                {card2 ? <TaroEx src={card2} /> : null}
              </CardBackground>
              <CardBackground>
                {card3 ? <TaroEx src={card3} /> : null}
              </CardBackground>
            </Cards>
            <AnimatePresence mode="wait" custom={back}>
              {count !== 3 ? (
                <StackedCardsContainer
                  custom={back}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 1 }}
                  key={count}
                >
                  {selectedCard[count].map((_, index) =>
                    selectedCard[count][index] !== 0 ? (
                      <BackcardBackground
                        key={index}
                        initial={{ y: 0 }}
                        animate={{
                          y: clicknumber === index ? -300 : 0,
                        }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.5 }}
                        onClick={() => consoleIndex(index, count)}
                        style={{
                          left: `${index * Overlap}rem`,
                          zIndex: numberOfCards - index,
                        }}
                      >
                        <BackOfCardImg src={BackOfCard} alt="Card back" />
                      </BackcardBackground>
                    ) : (
                      <></>
                    )
                  )}
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
                  {selectedCard[count].map((_, index) =>
                    selectedCard[count][index] !== 0 ? (
                      <BackcardBackground
                        key={index}
                        initial={{ y: 0 }}
                        animate={{
                          y: clicknumber === index ? -300 : 0,
                        }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.5 }}
                        onClick={() => consoleIndex(index, count)}
                        style={{
                          left: `${index * Overlap}rem`,
                          zIndex: numberOfCardsDelete - index,
                        }}
                      >
                        <BackOfCardImg src={BackOfCard} alt="Card back" />
                      </BackcardBackground>
                    ) : (
                      <></>
                    )
                  )}
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
