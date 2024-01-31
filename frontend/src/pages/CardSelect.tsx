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
import {
  cardNumberAtom1,
  cardNumberAtom2,
  cardNumberAtom3,
} from "../state/atom";
import LoadingPage from "../component/LoadingPage";
import MusicBar from "../component/MusicBar";
import InteractiveCard from "../component/InteractiveCard";
import Select1Img from "../assets/Select1.png";
import Select2Img from "../assets/Select2.png";
import Select3Img from "../assets/Select3.png";

const BackgroundColor = styled.div`
  position: relative;
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

const CardBackground = styled(motion.div)`
  width: 8.75rem;
  height: 15rem;
  border-radius: 0.9375rem;
  // background: #b99e6f;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TaroEx = styled.img`
  width: 8.75rem;
  height: 15rem;
`;

const Cards = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6.5rem;
  transform: translateX(10%);
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
  width: 22rem;
  height: 37.5rem;
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
  width: 20.55rem;
  height: 36rem;
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
    axios
      .get("/api/v1/tarot/card", {
        params: { card },
      })
      .then((response) => {
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
      })
      .catch(() => {});
  };
  //카드 클릭하면 고른 카드 배열에서 삭제
  const consoleIndex = (index: number, count: number) => {
    setIsModalOpen(true);
    getImage(selectedCard[count][index]);
    const updateCard = [...selectedCard];
    updateCard[count][index] = 0;
    setSelectedCard(updateCard);
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
        <MusicBar />
        <BackgroundWrapper>
          <BackgroundImg src={Background} alt="Background" />
          <CardsWrapper>
            <AnimatePresence>
              <Cards>
                {card1 ? (
                  <InteractiveCard imageUrl={card1} />
                ) : (
                  <CardBackground>
                    <TaroEx src={Select1Img} />
                  </CardBackground>
                )}

                {card2 ? (
                  <InteractiveCard imageUrl={card2} />
                ) : (
                  <CardBackground>
                    <TaroEx src={Select2Img} />
                  </CardBackground>
                )}
                {card3 ? (
                  <InteractiveCard imageUrl={card3} />
                ) : (
                  <CardBackground>
                    <TaroEx src={Select3Img} />
                  </CardBackground>
                )}
              </Cards>
            </AnimatePresence>

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
                        transition={{ duration: 0.05 }}
                        whileHover={{ scale: 1.05, y: -20 }}
                        onClick={() => consoleIndex(index, count)}
                        style={{
                          left: `${index * Overlap}rem`,
                          zIndex: numberOfCards - index,
                        }}
                      >
                        <BackOfCardImg src={BackOfCard} alt="Card back" />
                        <AnimatePresence>
                          {index ? <motion.div layoutId={index + ""} /> : null}
                        </AnimatePresence>
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
                      <AnimatePresence>
                        <BackcardBackground
                          key={index}
                          layoutId={index + ""}
                          transition={{ duration: 0.05 }}
                          whileHover={{ scale: 1.05, y: -20 }}
                          onClick={() => consoleIndex(index, count)}
                          style={{
                            left: `${index * Overlap}rem`,
                            zIndex: numberOfCardsDelete - index,
                          }}
                        >
                          <BackOfCardImg src={BackOfCard} alt="Card back" />
                        </BackcardBackground>
                      </AnimatePresence>
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
            {holdCount === 1 && isModalOpen ? (
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
            ) : holdCount === 2 && isModalOpen ? (
              <ModalBackground
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.stopPropagation();
                  setIsModalOpen(false);
                }}
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 90 }}
                transition={{ duration: 0.4 }}
              >
                <Modal layoutId={"2"}>
                  <ModalImg src={card2} />
                </Modal>
              </ModalBackground>
            ) : holdCount === 3 && isModalOpen ? (
              <ModalBackground
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.stopPropagation();
                  setIsModalOpen(false);
                }}
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 90 }}
                transition={{ duration: 0.4 }}
              >
                <Modal layoutId={"3"}>
                  <ModalImg src={card3} />
                </Modal>
              </ModalBackground>
            ) : null}
          </AnimatePresence>
        </BackgroundWrapper>
      </Inside>
    </BackgroundColor>
  );
};

export default CardSelect;
