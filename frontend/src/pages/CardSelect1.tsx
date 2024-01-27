import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import styled from "styled-components";
import Background from "../assets/Background.png";
import { useNavigate } from "react-router-dom";
import BackOfCard from "../assets/BackOfCard.png";
import NextButton from "../assets/NextBtn.png";
import { motion, AnimatePresence } from "framer-motion";
import { chunkArray, shuffleArray } from "../component/ShuffleArray";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { cardNumberAtom1 } from "../state/atom";
import LoadingPage from "../component/LoadingPage";
const BackgroundColor = styled.div`
  background: #000;
  width: 100vw;
  height: 100vh;
`;
const BackgroundWrapper = styled.div`
  position: relative; // 자식 요소를 절대 위치로 배치하기 위한 설정
  width: 79.4671675rem;
  height: 52.94rem;
  margin: auto;
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
  margin-left: 20rem;
`;
const TaroEx = styled.img`
  width: 7.72438rem;
  height: 13.90388rem;
`;
const Cards = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6.5rem;
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

const NextBtn = styled(motion.button)`
  border: none;
  background: none;
  width: 5.625rem;
  height: 5.125rem;
  position: absolute;
  right: 6.5rem;
  bottom: 13.5rem;
  cursor: pointer;
`;

const BeforeBtn = styled(motion.button)`
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
    x: isBack ? -window.outerWidth + 1000 : window.outerWidth - 1000,
    opacity: 1,
    transition: {
      duration: 0.25,
      type: "linear",
    },
  }),
  visible: {
    x: 0,
    transition: {
      duration: 0.25,
      type: "linear",
    },
  },
  exit: (isBack: boolean) => ({
    x: isBack ? window.outerWidth - 1000 : -window.outerWidth + 1000,
    opacity: 0,
    transition: {
      duration: 0.25,
      type: "linear",
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

const Modal = styled(motion.div)`
  position: absolute;
  width: 20vw;
  height: 60vh;
  top: 15%;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 0.9375rem;
  background: #b99e6f;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
`;

const ModalImg = styled.img`
  width: 95%;
  height: 95%;
`;

const ModalBackground = styled(motion.div)`
  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.9);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;
const CardSelect1 = () => {
  const numberOfCards = 22; // 1번째 줄 카드 수
  const numberOfCardsDelete = 12; // 4번째 줄 카드 수
  const Overlap = 1.875; // 카드 겹침 정도
  const [count, setCount] = useState(0); //몇번째 슬라이드인지
  const [back, setBack] = useState(false); //뒤로 갈지 앞으로 갈지
  const [card1, setCard1] = useState("");
  const [selectedCard, setSelectedCard] = useState<number[][]>([[]]);
  const setCardNumber1 = useSetRecoilState(cardNumberAtom1);
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
      const response = await axios.get("/api/v1/tarot/card", {
        params: { card },
      });
      setCard1(response.data.data.image_url);
      setCardNumber1(card);
      // 페이지 이동
      setTimeout(() => {
        navigate("/process1");
      }, 1000);
    } catch (error) {
      console.error("실패:", error);
    }
  };
  const consoleIndex = (index: number, count: number) => {
    setIsModalOpen(true);
    const card = selectedCard[count][index];
    getImage(card);
  };
  useEffect(() => {
    const numbers = Array.from({ length: 78 }, (_, index) => index + 1);
    shuffleArray(numbers);
    setSelectedCard(chunkArray(numbers, 22));
  }, []);

  //2초뒤에 카드 모달이 닫히게 하기
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let timeoutId: number | undefined;

    if (isModalOpen) {
      // 모달이 열리면 타임아웃을 설정합니다.
      timeoutId = window.setTimeout(() => {
        setIsModalOpen(false);
      }, 2000);
    }

    // Cleanup 함수를 반환합니다. 이 함수는 컴포넌트가 언마운트되거나
    // useEffect의 의존성 배열에 있는 값이 변경될 때 호출됩니다.
    return () => {
      if (timeoutId) {
        // 타임아웃을 취소합니다.
        clearTimeout(timeoutId);
      }
    };
  }, [isModalOpen]);
  return (
    <BackgroundColor>
      <Inside>
        <LoadingPage></LoadingPage>
        <Navbar />
        <BackgroundWrapper>
          <BackgroundImg src={Background} alt="Background" />
          <CardsWrapper>
            <Cards>
              <CardBackground>
                {card1 ? <TaroEx src={card1} /> : <TaroEx src={BackOfCard} />}
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
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.05, y: -20 }}
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
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.05, y: -20 }}
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

          <NextBtn onClick={incraseIndex} whileTap={{ scale: 0.9 }}>
            <NextBtnImg src={NextButton} />
          </NextBtn>
          <BeforeBtn
            onClick={decraseIndex}
            initial={{ rotate: "180deg" }}
            whileTap={{ scale: 0.9 }}
          >
            <NextBtnImg src={NextButton} />
          </BeforeBtn>
          <AnimatePresence>
            {isModalOpen ? (
              <ModalBackground
                onClick={() => {
                  setIsModalOpen(false);
                }}
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 90 }}
                transition={{ duration: 0.4 }}
              >
                <Modal layoutId={"1"}>
                  <ModalImg src={card1} />
                </Modal>
              </ModalBackground>
            ) : null}
          </AnimatePresence>
        </BackgroundWrapper>
      </Inside>
    </BackgroundColor>
  );
};
export default CardSelect1;
