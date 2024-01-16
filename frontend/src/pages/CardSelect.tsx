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
import BackOfCard from "../assets/BackOfCard.png";
import NextButton from "../assets/NextBtn.png";
import { motion, AnimatePresence } from "framer-motion";
import { chunkArray, shuffleArray } from "../component/ShuffleArray";
import axios from "axios";
import { io } from "socket.io-client";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "../state/atom";

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
  const [numberOfCards1, setNumberOfCards1] = useState(22); // 1번째 줄 카드 수
  const [numberOfCards2, setNumberOfCards2] = useState(22); // 2번째 줄 카드 수
  const [numberOfCards3, setNumberOfCards3] = useState(22); // 3번째 줄 카드 수
  const [numberOfCardsDelete, setNumberOfCardsDelete] = useState(12); // 4번째 줄 카드 수
  const Overlap = 1.875; // 카드 겹침 정도
  const [count, setCount] = useState(0); //몇번째 슬라이드인지
  const [holdCount, setHoldCount] = useState(0);
  const [back, setBack] = useState(false); //뒤로 갈지 앞으로 갈지
  const [chunkNumber, setChunkNumber] = useState<number[][]>([]);
  const [card1, setCard1] = useState("");
  const [card2, setCard2] = useState("");
  const [card3, setCard3] = useState("");
  const [clicknumber, setClickNumber] = useState(-1);
  //const [streamData, setStreamData] = useState("");
  const [streamArray, setStreamArray] = useState("");
  const accesstoken = useRecoilValue(accessTokenState);

  const socket = io(`http://localhost:3000/?cards=1,3,5&ask=hi`, {
    auth: {
      token: accesstoken,
    },
  });
  const webSocketStreaming = () => {
    socket.on("chat message", (msg) => {
      console.log(msg);
      //promptInput();
    });

    socket.on("message", (msg) => {
      console.log(`받은 메시지 :" + ${msg}`);
      setStreamArray((prev) => prev + msg);
    });

    socket.on("connect", () => {
      console.log("서버에 연결되었습니다.");
    });
    socket.on("disconnect", () => {
      console.log("서버와의 연결이 끊어졌습니다.");
    });

    socket.on("success", () => {
      console.log("연결 작업 성공");
    });

    socket.on("finish", async () => {
      console.log("연결 작업 종료");
      socket.disconnect();
    });
  };
  const incraseIndex = () => {
    setCount((prev) => (prev === 3 ? 0 : prev + 1));
    setBack(false);
  };
  const decraseIndex = () => {
    setCount((prev) => (prev === 0 ? 3 : prev - 1));
    setBack(true);
  };

  const getImage = async (card: number) => {
    console.log(card);
    try {
      console.log(holdCount);
      const response = await axios.post("/tarot/card/info", null, {
        params: { card }, // {이름/카드 번호}
      });

      if (holdCount === 0) {
        setCard1(response.data.data.image_url);
      } else if (holdCount === 1) {
        setCard2(response.data.data.image_url);
      } else if (holdCount === 2) {
        setCard3(response.data.data.image_url);
      }

      setHoldCount((prev) => (prev === 2 ? 3 : prev + 1));
    } catch (error) {
      console.log(error);
    }
  };
  const consoleIndex1 = (index: number, count: number) => {
    webSocketStreaming();
    console.log(chunkNumber[count][index]);
    getImage(chunkNumber[count][index]); // 현재 사용자가 클릭한 번호
    chunkNumber[count].splice(index, 1);
    setNumberOfCards1((prev) => prev - 1);
    setClickNumber(index);
  };
  const consoleIndex2 = (index: number, count: number) => {
    console.log(chunkNumber[count][index]);
    getImage(chunkNumber[count][index]);
    chunkNumber[count].splice(index, 1);
    setNumberOfCards2((prev) => prev - 1);
    setClickNumber(index);
  };
  const consoleIndex3 = (index: number, count: number) => {
    console.log(chunkNumber[count][index]);
    getImage(chunkNumber[count][index]);
    chunkNumber[count].splice(index, 1);
    setNumberOfCards3((prev) => prev - 1);
    setClickNumber(index);
  };
  const consoleIndex4 = (index: number, count: number) => {
    console.log(chunkNumber[count][index]);
    getImage(chunkNumber[count][index]);
    chunkNumber[count].splice(index, 1);
    setNumberOfCardsDelete((prev) => prev - 1);
    setClickNumber(index);
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
          <p style={{ color: "white" }}>{streamArray}</p>
          <BackgroundImg src={Background} alt="Background" />
          <CardsWrapper>
            <Cards>
              <CardBackground>
                <TaroEx src={card1} />
              </CardBackground>

              <CardBackground>
                <TaroEx src={card2} />
              </CardBackground>
              <CardBackground>
                <TaroEx src={card3} />
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
                  {Array.from({ length: numberOfCardsDelete }).map(
                    (_, index) => (
                      <BackcardBackground
                        key={index}
                        initial={{ y: 0 }}
                        animate={{
                          y: clicknumber === index ? -300 : 0,
                        }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.5 }}
                        onClick={() => consoleIndex4(index, count)}
                        style={{
                          left: `${index * Overlap}rem`,
                          zIndex: numberOfCardsDelete - index,
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
                  {Array.from({ length: numberOfCards3 }).map((_, index) => (
                    <BackcardBackground
                      key={index}
                      initial={{ y: 0 }}
                      animate={{
                        y: clicknumber === index ? -300 : 0,
                      }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.5 }}
                      onClick={() => consoleIndex3(index, count)}
                      style={{
                        left: `${index * Overlap}rem`,
                        zIndex: numberOfCards3 - index,
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
                  {Array.from({ length: numberOfCards2 }).map((_, index) => (
                    <BackcardBackground
                      key={index}
                      initial={{ y: 0 }}
                      animate={{
                        y: clicknumber === index ? -300 : 0,
                      }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.5 }}
                      onClick={() => consoleIndex2(index, count)}
                      style={{
                        left: `${index * Overlap}rem`,
                        zIndex: numberOfCards2 - index,
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
                  {Array.from({ length: numberOfCards1 }).map((_, index) => (
                    <BackcardBackground
                      key={index}
                      initial={{ y: 0 }}
                      animate={{
                        y: clicknumber === index ? -300 : 0,
                      }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.5 }}
                      onClick={() => consoleIndex1(index, count)}
                      style={{
                        left: `${index * Overlap}rem`,
                        zIndex: numberOfCards1 - index,
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
