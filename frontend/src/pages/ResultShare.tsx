import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import styled from "styled-components";
import FlipCard from "../assets/ResultFlipCard.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingPage from "../component/LoadingPage";
import "../assets/font-YUniverse-B.css";
import "../assets/font-S-CoreDream-3Light.css";
import { motion, AnimatePresence } from "framer-motion";
const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
`;

const Inside = styled.div`
  width: 81.75rem;
  margin-left: auto;
  margin-right: auto;
`;
const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.125rem;
`;

const DetailBackground = styled.div`
  width: 68.3125rem;
  height: 45.9375rem;
  border-radius: 0.25rem;
  background: #e9e5da;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DetailLine1 = styled.div`
  width: 65.85rem;
  height: 43.5rem;
  border-radius: 0.625rem;
  border: 0.03125rem solid #b88150;
  background: rgba(217, 217, 217, 0);
  display: flex;
  justify-content: space-between;
  align-items: center;
  //margin-top: 1.5rem;
  flex-direction: column;
`;

const DetailLine2 = styled.div`
  width: 65.1rem;
  height: 42.625rem;
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  border: 0.03125rem solid #b88150;
  background: rgba(217, 217, 217, 0);
  margin-top: 0.3125rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 2rem;
`;

const Date = styled.p`
  color: #b88150;
  font-family: Italiana;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 300;
  margin: 0.5rem;
`;

const Question = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;
`;

const Title = styled.p`
  color: #b99e6f;
  text-align: center;
  font-family: YUniverse-B;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  width: 10rem;
  //margin-top: 0.9375rem;
  //line-height: 1rem;
`;

const Worry = styled.p`
  width: 30rem;
  height: 1.6rem;
  color: #b99e6f;
  text-align: center;
  font-family: YUniverse-B;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  //margin-top: 0.8125rem;
  overflow-y: scroll;
  padding-right: 0.125rem;
  letter-spacing: 0.01rem;

  &::-webkit-scrollbar {
    width: 0.1875rem; /* 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ecb973; /* 황금색 스크롤바 색상 */
    border-radius: 0.3125rem; /* 스크롤바 모양 (둥근 모서리) */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #daa520; /* 호버시 색상 변경 (더 진한 황금색) */
  }
`;

const Cards = styled.div<TaroExsProps>`
  display: flex;
  flex-direction: row;
  gap: ${(props) => (props.tarotImage === 5 ? "2.5rem" : "4.75rem")};
  //margin-top: 2rem;
  align-items: center;
  width: 34.375rem;
  justify-content: center; //merge
`;

const CardBackground = styled.div`
  width: 8.859375rem;
  height: 15.1875rem;
  border-radius: 0.9375rem;
  background: #b99e6f;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  backface-visibility: hidden;
  transform: rotateY(0deg);
`;
interface TaroExsProps {
  tarotImage: number;
}

const TaroEx = styled.img`
  width: 7.8209375rem;
  height: 14.0776875rem;
`;

const Solutions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem; //0.4 -> 1
  //margin-top: 1.8rem;
  align-items: center;
`;

const SolutionTitle = styled.p`
  color: #806838;
  text-align: center;
  font-family: YUniverse-B;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const SolutionDetail = styled.p`
  width: 48.875rem;
  height: 5.7rem;
  color: #806838;
  text-align: center;
  font-family: YUniverse-B;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 300;
  line-height: 1.6;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: 0.625rem;
  letter-spacing: 0.01rem;

  &::-webkit-scrollbar {
    width: 0.1875rem; /* 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-thumb {
    //background-color: #ecb973; /* 황금색 스크롤바 색상 */
    background-color: #b99e6f; /* 스크롤바 색상 변경 */
    border-radius: 0.3125rem; /* 스크롤바 모양 (둥근 모서리) */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #daa520; /* 호버시 색상 변경 (더 진한 황금색) */
  }
`;

const FlipcardBackground = styled.div`
  width: 8.859375rem;
  height: 15.1875rem;
  border-radius: 0.9375rem;
  background: #b99e6f;
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
  transform: rotateY(180deg);
`;

const FlipcardImg = styled.img`
  width: 7.8209375rem;
  height: 14.0776875rem;

  mix-blend-mode: screen;
`;

const FlipcardInner = styled.div<FlipcardInnerProps>`
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  cursor: pointer;

  transform: rotateY(${(props) => (props.isFlipped ? "180deg" : "0")});
`;

const FlipcardContainer = styled.div`
  position: relative;
  width: 8.859375rem;
  height: 15.1875rem;
  border-radius: 0.9375rem;
  perspective: 62.5rem;
`;

interface FlipcardInnerProps {
  isFlipped: boolean;
}

const CardTitle = styled.p`
  color: #806838;
  text-align: center;
  font-family: YUniverse-B;
  font-size: 0.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  width: 26.8125rem;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CardContent = styled.p`
  color: #fbecc6;
  font-family: YUniverse-B;
  font-size: 0.6rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  position: absolute;
  top: 32%; // CardTitle 아래에 위치 //57 -> 38
  //left: 50%;
  //transform: translate(-50%, -50%);
  width: 5rem;
  height: 7.4rem;
  overflow-y: auto;
  margin: 0.5rem;
  padding-right: 0.2rem;

  &::-webkit-scrollbar {
    width: 0.07rem;
    height: 0.05rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ecb973;
    border-radius: 0.2rem;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #b88150ba;
  }
`;

const Modal = styled(motion.div)`
  position: absolute;
  width: 23rem;
  height: 38.5rem;
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
  width: 22.9rem;
  height: 38rem;
  mix-blend-mode: screen;
  border-radius: 0.9375rem;
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

const ModalCardContent = styled.p`
  color: #fbecc6;
  font-family: YUniverse-B;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 300;
  line-height: 2rem;
  position: absolute;
  top: 38%;
  width: 15rem;
  height: 18.4rem;
  overflow-y: auto;
  margin: 0.5rem;
  padding-right: 0.2rem;
  text-align: center;

  &::-webkit-scrollbar {
    width: 0.07rem;
    height: 0.05rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ecb973;
    border-radius: 0.2rem;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #b88150ba;
  }
`;

const ModalCardTitle = styled.p`
  color: #66532c;
  text-align: center;
  font-family: YUniverse-B;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  width: 26.8125rem;
  position: absolute;
  top: 34%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

interface CardType {
  explanation: string;
  image_url: string;
  eng_name: string;
  date: string;
}

function ResultShare() {
  const [flippedCards, setFlippedCards] = useState(Array(10).fill(false));

  const { poll_id } = useParams();
  const [question, setQuestion] = useState("");
  const [explanation, setExplanation] = useState("");
  const [luck, setLuck] = useState("");
  const [date, setDate] = useState("");
  const [masterName, setMasterName] = useState("");
  const [tarotImage, setTarotImage] = useState<CardType[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );

  const handleCardClick = (card: CardType, index: number) => {
    setIsModalOpen(true);
    setSelectedCard(card);
    setSelectedCardIndex(index);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (selectedCardIndex !== null) {
      handleFlip(selectedCardIndex);
    }
  };

  // 카드를 뒤집는 함수
  const handleFlip = (flip: number) => {
    const newFlippedCards = [...flippedCards];
    newFlippedCards[flip] = !newFlippedCards[flip];
    setFlippedCards(newFlippedCards);
  };

  const getDetails = (): void => {
    axios
      .get("/api/v1/share", {
        params: {
          poll_id,
        },
      })
      .then((response) => {
        setQuestion(response.data.data.result[0].question);
        setTarotImage(response.data.data.card);
        setExplanation(response.data.data.result[0].explanation);
        setDate(response.data.data.date[0].created_date);
        setLuck(response.data.data.result[0].luck);
        setMasterName(response.data.data.result[0].master_name);
      })
      .catch(() => {});
  };

  useEffect(() => {
    getDetails();
  }, []);
  return (
    <>
      <Background>
        <Inside>
          <LoadingPage></LoadingPage>
          <Navbar />
          <Details>
            <DetailBackground>
              <DetailLine1>
                <DetailLine2>
                  <Question>
                    <Title>
                      당신의 고민
                      <br /> . . .
                    </Title>
                    <Worry>" {question} "</Worry>
                  </Question>
                  <Cards tarotImage={tarotImage.length}>
                    {tarotImage.map((number, index) => (
                      <FlipcardContainer
                        onClick={() => {
                          handleFlip(index);

                          handleCardClick(number, index);
                        }}
                      >
                        <FlipcardInner isFlipped={flippedCards[index]}>
                          <CardBackground>
                            <TaroEx src={number.image_url} />
                          </CardBackground>
                          <FlipcardBackground>
                            <FlipcardImg src={FlipCard}></FlipcardImg>
                            <CardTitle>{number.eng_name}</CardTitle>
                            <CardContent>{number.explanation}</CardContent>
                          </FlipcardBackground>
                        </FlipcardInner>
                      </FlipcardContainer>
                    ))}
                  </Cards>
                  <Solutions>
                    <SolutionTitle>
                      {masterName} 타로 마스터의 '{luck}' 솔루션
                    </SolutionTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="13"
                      viewBox="0 0 27 20"
                      fill="none"
                    >
                      <path
                        d="M8.4375 3.33333L10.125 0H6.75C3.02062 0 0 4.65 0 8.33333V20H11.8125V8.33333H5.0625C5.0625 3.33333 8.4375 3.33333 8.4375 3.33333ZM20.25 8.33333C20.25 3.33333 23.625 3.33333 23.625 3.33333L25.3125 0H21.9375C18.2081 0 15.1875 4.65 15.1875 8.33333V20H27V8.33333H20.25Z"
                        fill="#B99E6F"
                        fill-opacity="0.8"
                      />
                    </svg>
                    <SolutionDetail>{explanation}</SolutionDetail>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="13"
                      viewBox="0 0 27 20"
                      fill="none"
                    >
                      <path
                        d="M15.1875 8.33333V20H27V8.33333C27 4.66667 23.9625 0 20.25 0H16.875L18.5625 3.33333C18.5625 3.33333 21.9375 3.33333 21.9375 8.33333H15.1875ZM0 8.33333V20H11.8125V8.33333C11.8125 4.66667 8.775 0 5.0625 0H1.6875L3.375 3.33333C3.375 3.33333 6.75 3.33333 6.75 8.33333H0Z"
                        fill="#B99E6F"
                        fill-opacity="0.8"
                      />
                    </svg>
                  </Solutions>
                </DetailLine2>
                <Date>
                  <b>ㆍ</b>
                  {date}
                  <b>ㆍ</b>
                </Date>
              </DetailLine1>
            </DetailBackground>
          </Details>
        </Inside>
      </Background>
      <AnimatePresence>
        {isModalOpen && selectedCard && (
          <ModalBackground
            onClick={() => {
              setIsModalOpen(false);
              {
                handleCloseModal();
              }
            }}
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Modal layoutId={"5"}>
              <ModalImg src={FlipCard} />
              <ModalCardTitle>{selectedCard.eng_name}</ModalCardTitle>
              <ModalCardContent>{selectedCard.explanation}</ModalCardContent>
            </Modal>
          </ModalBackground>
        )}
      </AnimatePresence>
    </>
  );
}

export default ResultShare;
