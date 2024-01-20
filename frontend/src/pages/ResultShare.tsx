import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import styled from "styled-components";
import FlipCard from "../assets/ResultFlipCard.png";
import { useParams } from "react-router-dom";
import axios from "axios";

import LoadingPage from "../component/LoadingPage";
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
  width: 60.3125rem;
  height: 44.9375rem;
  border-radius: 0.25rem;
  background: #e9e5da;
  margin-top: 2rem;

  display: flex;
  justify-content: center;
`;

const DetailLine1 = styled.div`
  width: 58.75rem;
  height: 42.5rem;
  border-radius: 0.625rem;
  border: 0.03125rem solid #b88150;
  background: rgba(217, 217, 217, 0);

  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
  flex-direction: column;
`;

const DetailLine2 = styled.div`
  width: 58.0625rem;
  height: 39.625rem;
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  border: 0.03125rem solid #b88150;
  background: rgba(217, 217, 217, 0);
  margin-top: 0.3125rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Date = styled.p`
  display: flex;
  width: 11.0625rem;
  height: 2.5625rem;
  flex-direction: column;
  justify-content: center;
  color: #b88150;
  text-align: center;
  font-family: "Italiana", sans-serif;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: uppercase;
  padding-bottom: 0.4rem;
`;

const Title = styled.p`
  color: #b99e6f;
  text-align: center;
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 600;
  width: 4.5rem;
  margin-top: 0.9375rem;
  line-height: 1.5;
`;

const Worry = styled.p`
  width: 28.125rem;
  height: 3.125rem;
  color: #b99e6f;
  text-align: center;
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 0.8125rem;
  overflow-y: scroll;
  padding-right: 0.125rem;

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

const Cards = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4.75rem;
  margin-top: 2rem;
  align-items: center;
  width: 34.375rem;
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

const TaroEx = styled.img`
  width: 7.8209375rem;
  height: 14.0776875rem;
`;

const Solutions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  margin-top: 1.8125rem;
  align-items: center;
`;

const SolutionTitle = styled.p`
  color: #806838;
  text-align: center;
  font-family: Inter;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const SolutionDetail = styled.p`
  width: 38.875rem;
  color: #806838;
  text-align: center;
  font-family: Inter;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  height: 5rem;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: 0.625rem;

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

const FlipcardBackground = styled.div`
  width: 8.859375rem;
  height: 15.1875rem;
  border-radius: 0.9375rem;
  background: #b99e6f;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  backface-visibility: hidden;
  transform: rotateY(180deg);
`;

const FlipcardImg = styled.img`
  width: 7.8209375rem;
  height: 14.0776875rem;

  mix-blend-mode: screen;
`;

const FlipcardInner = styled.div<FlipcardInnerProps>`
  position: relative;
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
  font-family: Inter;
  font-size: 0.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  width: 26.8125rem;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CardContent = styled.p`
  color: #fbecc6;
  font-family: Inter;
  font-size: 0.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: absolute;
  top: 57%; // CardTitle 아래에 위치
  left: 50%;
  transform: translate(-50%, -50%);
`;

interface ImgType {
  explanation: string;
  image_url: string;
  eng_name: string;
}

function ResultShare() {
  const [flippedCards, setFlippedCards] = useState(Array(10).fill(false));

  const { poll_id } = useParams();
  const [question, setQuestion] = useState("");
  const [explanation, setExplanation] = useState("");
  const [luck, setLuck] = useState("");
  const [masterName, setMasterName] = useState("");
  const [tarotImage, setTarotImage] = useState<ImgType[]>([]);

  // 카드를 뒤집는 함수
  const handleFlip = (flip: number) => {
    const newFlippedCards = [...flippedCards];
    newFlippedCards[flip] = !newFlippedCards[flip];
    setFlippedCards(newFlippedCards);
  };

  const getDetails = (): void => {
    axios
      .get("/api/v1/share/", {
        params: {
          poll_id,
        },
      })
      .then((response) => {
        setQuestion(response.data.data.result[0].question);
        setTarotImage(response.data.data.card);
        setExplanation(response.data.data.result[0].explanation);
        setLuck(response.data.data.result[0].luck);
        setMasterName(response.data.data.result[0].master_name);
      })
      .catch((error) => {
        console.error("마이페이지 디테일 조회 실패:", error);
      });
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
                  <Title>당신의 고민 . . .</Title>
                  <Worry>{question}</Worry>
                  <Cards>
                    {tarotImage.map((number, index) => (
                      <FlipcardContainer onClick={() => handleFlip(index)}>
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
                      {masterName} 타로 마스터의 솔루션
                    </SolutionTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="27"
                      height="20"
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
                      width="27"
                      height="20"
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
                <Date>ㆍ{luck}ㆍ</Date>
              </DetailLine1>
            </DetailBackground>
          </Details>
        </Inside>
      </Background>
    </>
  );
}

export default ResultShare;
