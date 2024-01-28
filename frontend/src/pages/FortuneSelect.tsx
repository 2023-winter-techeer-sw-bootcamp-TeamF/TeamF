import { useState } from "react";
import Navbar from "../component/Navbar";
import styled from "styled-components";
import Background from "../assets/Background.png";
import FriendshipImg from "../assets/Friendship.png";
import LoveFortuneImg from "../assets/LoveFortune.png";
import MoneyFortuneImg from "../assets/MoneyFortune.png";
import TodayFortuneImg from "../assets/TodayFortune.png";
import WishFortuneImg from "../assets/WishFortune.png";
import FlipCard from "../assets/FlipCard.png";
import LoadingPage from "../component/LoadingPage";
import "../assets/font-YUniverse-B.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { accessTokenState } from "../state/atom.ts";
import { useRecoilValue } from "recoil";

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

const OverlayContent = styled.div`
  position: absolute; // 부모 컨테이너인 BackgroundWrapper에 상대적인 위치
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #ecb973;
`;

const BackgroundColor = styled.div`
  background: #000;
  width: 100vw;
  height: 100vh;
`;

const TitleContainer = styled(motion.div)`
  //타로 마스터가 여러분의 운세를 봐드립니다
  text-align: center;
  color: #ecb973;
  text-align: center;
  font-family: YUniverse-B;
  font-style: normal;
  font-weight: 300;
  letter-spacing: 0.05rem;
  line-height: normal;
  text-transform: uppercase;
  font-size: 2rem;
  margin-bottom: 3.5rem;
`;

const ContentContainer = styled(motion.p)`
  //타로 마스터의 설명을 참고하여 주제별 운세를 선택해주세요
  color: #ecb973;
  text-align: center;
  font-family: YUniverse-B;
  font-size: 1rem; //1.125rem
  font-style: normal;
  font-weight: 300;
  letter-spacing: 0.05rem;
  line-height: normal;
  text-transform: uppercase;
  margin-top: 1.25rem;
  margin-bottom: 6rem;
`;

const CardBox = styled(motion.div)`
  //각 카드 박스
  width: 12.375rem;
  height: 20.75rem;
  flex-shrink: 0;
  border-radius: 0.75rem;
  border: 0.125rem solid #ecb973;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: black;
  position: absolute;
  backface-visibility: hidden;
  transform: rotateY(0deg);
  cursor: pointer;
  /*
  &:hover {
    background: #2b3140;
  }
  */
`;

const CardsContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  margin-top: 2.5rem;
`;
const ProfileImage = styled.img`
  // 프로필 이미지
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 8rem;
  flex-direction: column;
  margin-top: 3.25rem;
`;

const Question = styled.span`
  // 어떨까?
  color: #ecb973;
  text-align: center;
  font-family: YUniverse-B;
  font-size: 1rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-top: 3.125rem;
`;

const CardTitle = styled.span`
  //운 이름
  color: #ecb973;
  text-align: center;
  font-family: YUniverse-B;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
  margin-top: 0.2rem;
`;

const Inside = styled.div`
  width: 81.75rem;
  margin-left: auto;
  margin-right: auto;
`;
const FlipCardImg = styled.img`
  width: 12.375rem;
  height: 20.75rem;
  flex-shrink: 0;
  border-radius: 0.75rem;
  display: flex;
  position: relative; // 내부 절대 위치 요소를 위한 상대 위치 설정
  mix-blend-mode: darken;
`;

const FlipcardBackground = styled.div`
  width: 12.375rem;
  height: 20.75rem;
  border-radius: 0.75rem;
  background-color: rgba(255, 255, 255, 0);
  position: absolute;
  backface-visibility: hidden;
  transform: rotateY(180deg);
`;

const FlipcardContainer = styled(motion.div)`
  position: relative;
  width: 12.375rem;
  height: 20.75rem;
  perspective: 62.5rem;
`;

const FlipcardInner = styled.div<FlipcardInnerProps>`
  position: relative;
  width: 12.375rem;
  height: 20.75rem;
  text-align: left;
  transition: transform 0.6s;
  transform-style: preserve-3d;

  transform: rotateY(${(props) => (props.isFlipped ? "180deg" : "0")});
`;

interface FlipcardInnerProps {
  isFlipped: boolean;
}

const CardText = styled.span`
  position: absolute;
  top: 42%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  color: #fffbf2;
  font-family: YUniverse-B;
  font-weight: 300;
  font-size: 0.8rem;
  text-align: center;
  width: 9.5rem;
  line-height: 1.5;
  //margin-top: 0.6rem;
  display: inline;
`;
const CardTextToday = styled.span`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  color: #fffbf2;
  font-family: YUniverse-B;
  font-weight: 300;
  font-size: 0.8rem;
  text-align: center;
  width: 9.5rem;
  line-height: 1.5;
  //margin-top: 0.6rem;
  display: inline;
`;
const Bold = styled.span`
  color: #fffbf2;
  font-family: YUniverse-B;
  font-size: 0.95rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const SoloBtn = styled(motion.div)`
  width: 8.4375rem;
  height: 1.5rem;
  flex-shrink: 0;
  border-radius: 0.9375rem;
  background: #fbecc6;
  position: absolute;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const SoloText = styled.p`
  color: #806838;
  text-align: center;
  font-family: YUniverse-B;
  font-size: 0.7rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
`;

const FortuneSelect = () => {
  const [flippedCards, setFlippedCards] = useState(Array(5).fill(false));
  const navigate = useNavigate();
  const accessToken = useRecoilValue(accessTokenState);

  const handlePageNavigation = (path: string) => {
    if (!accessToken) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };
  // 카드를 뒤집는 함수
  const handleFlip = (flipIndex: number) => {
    const newFlippedCards = flippedCards.map((_, index) => index === flipIndex);
    setFlippedCards(newFlippedCards);
  };

  return (
    <BackgroundColor>
      <Inside>
        <Navbar />
        <BackgroundWrapper>
          <BackgroundImg src={Background} />
          <OverlayContent>
            <TitleContainer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.3 }}
            >
              타로 마스터에게
              <br /> 여러분의 고민을 들려주세요!
            </TitleContainer>
            <ContentContainer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.3 }}
            >
              운세별 설명을 참고하여
              <br /> 여러분이 상담하고 싶은 주제를 선택할 수 있어요
            </ContentContainer>
            <CardsContainer
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                y: [-10, 0],
              }}
              transition={{ delay: 2.1, duration: 0.8, ease: "easeIn" }}
            >
              <FlipcardContainer
                onClick={() => handleFlip(0)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <FlipcardInner isFlipped={flippedCards[0]}>
                  <CardBox
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                  >
                    <ProfileImage src={TodayFortuneImg} />
                    <Question>나의 오늘은 어떨까?</Question>
                    <CardTitle>오늘의 운세</CardTitle>
                  </CardBox>
                  <FlipcardBackground>
                    <FlipCardImg src={FlipCard} />
                    <CardText>
                      <Bold>세레나 마스터</Bold>는<br />
                      별과 달의 조화로 미래를 읽는.
                      <br />
                      타로 마스터에요.
                      <br />
                      <Bold>오늘의 운세</Bold>는<br />
                      <Bold>총 1장</Bold>의 카드를 뽑아요.
                      <br />
                      <Bold>세레나 마스터</Bold>에게
                      <br />
                      여러분의 고민을
                      <br />
                      솔직하게 얘기해 주신다면
                      <br />
                      타로 카드와 함께
                      <br />
                      자세히 분석해 드릴게요.
                    </CardText>
                    <SoloBtn
                      onClick={() => handlePageNavigation("/todayfortune")}
                    >
                      <SoloText>오늘의 운세 보러가기</SoloText>
                    </SoloBtn>
                  </FlipcardBackground>
                </FlipcardInner>
              </FlipcardContainer>

              <FlipcardContainer
                onClick={() => handleFlip(1)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
              >
                <FlipcardInner isFlipped={flippedCards[1]}>
                  <CardBox
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                  >
                    <ProfileImage src={LoveFortuneImg} />
                    <Question>우리 사이 애정은?</Question>
                    <CardTitle>연애운</CardTitle>
                  </CardBox>
                  <FlipcardBackground>
                    <FlipCardImg src={FlipCard} />
                    <CardText>
                      <Bold>샤를린 마스터</Bold>는<br />
                      100번 이상의 연애 경험을 지닌
                      <br />
                      연애 고수 타로 마스터에요.
                      <br />
                      <Bold>연애운</Bold>는<br />
                      <Bold>총 5장</Bold>의 카드를 뽑아요.
                      <br />
                      <Bold>샤를린 마스터</Bold>에게
                      <br />
                      여러분의 고민을
                      <br />
                      솔직하게 얘기해 주신다면
                      <br />
                      타로 카드와 함께
                      <br />
                      자세히 분석해 드릴게요.
                    </CardText>

                    <SoloBtn
                      onClick={() => handlePageNavigation("/lovefortune")}
                    >
                      <SoloText>연애운 보러가기</SoloText>
                    </SoloBtn>
                  </FlipcardBackground>
                </FlipcardInner>
              </FlipcardContainer>

              <FlipcardContainer
                onClick={() => handleFlip(2)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
              >
                <FlipcardInner isFlipped={flippedCards[2]}>
                  <CardBox
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                  >
                    <ProfileImage src={FriendshipImg} />
                    <Question>우리 사이 우정은?</Question>
                    <CardTitle>우정운</CardTitle>
                  </CardBox>
                  <FlipcardBackground>
                    <FlipCardImg src={FlipCard} />
                    <CardText>
                      <Bold>마틸드 마스터</Bold>는<br />
                      풍부한 경험과 깊은 통찰력을
                      <br />
                      지닌 타로 마스터에요.
                      <br />
                      <Bold>우정운</Bold>는<br />
                      <Bold>총 5장</Bold>의 카드를 뽑아요.
                      <br />
                      <Bold>마틸드 마스터</Bold>에게
                      <br />
                      여러분의 고민을
                      <br />
                      솔직하게 얘기해 주신다면
                      <br />
                      타로 카드와 함께
                      <br />
                      자세히 분석해 드릴게요.
                    </CardText>

                    <SoloBtn
                      onClick={() => handlePageNavigation("/friendship")}
                    >
                      <SoloText>우정운 보러가기</SoloText>
                    </SoloBtn>
                  </FlipcardBackground>
                </FlipcardInner>
              </FlipcardContainer>
              <FlipcardContainer
                onClick={() => handleFlip(3)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
              >
                <FlipcardInner isFlipped={flippedCards[3]}>
                  <CardBox
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                  >
                    <ProfileImage src={MoneyFortuneImg} />
                    <Question>나 부자 될 수 있을까?</Question>
                    <CardTitle>재물운</CardTitle>
                  </CardBox>
                  <FlipcardBackground>
                    <FlipCardImg src={FlipCard} />
                    <CardTextToday>
                      <Bold>제라드 마스터</Bold>는<br />
                      여러 사업을 성공적으로
                      <br />
                      운영하며 거대한 부를
                      <br />
                      축적한 타로 마스터에요.
                      <br />
                      <Bold>재물운</Bold>은<br />
                      <Bold>총 3장</Bold>의 카드를 뽑아요.
                      <br />
                      <Bold>제라드 마스터</Bold>에게
                      <br />
                      여러분의 고민을
                      <br />
                      솔직하게 얘기해 주신다면
                      <br />
                      타로 카드와 함께
                      <br />
                      자세히 분석해 드릴게요.
                    </CardTextToday>

                    <SoloBtn
                      onClick={() => handlePageNavigation("/moneyfortune")}
                    >
                      <SoloText>재물운 보러가기</SoloText>
                    </SoloBtn>
                  </FlipcardBackground>
                </FlipcardInner>
              </FlipcardContainer>
              <FlipcardContainer
                onClick={() => handleFlip(4)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
              >
                <FlipcardInner isFlipped={flippedCards[4]}>
                  <CardBox
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                  >
                    <ProfileImage src={WishFortuneImg} />
                    <Question>이룰 수 있을까?</Question>
                    <CardTitle>소망운</CardTitle>
                  </CardBox>
                  <FlipcardBackground>
                    <FlipCardImg src={FlipCard} />
                    <CardText>
                      <Bold>굴이 마스터</Bold>는<br />
                      작은 몸집에 거대한 통찰력이
                      <br />
                      숨어있는 타로 마스터에요.
                      <br />
                      <Bold>소망운</Bold>은<br />
                      <Bold>총 3장</Bold>의 카드를 뽑아요.
                      <br />
                      <Bold>굴이 마스터</Bold>에게
                      <br />
                      여러분의 고민을
                      <br />
                      솔직하게 얘기해 주신다면
                      <br />
                      타로 카드와 함께
                      <br />
                      자세히 분석해 드릴게요.
                    </CardText>

                    <SoloBtn
                      onClick={() => handlePageNavigation("/wishfortune")}
                    >
                      <SoloText>소망운 보러가기</SoloText>
                    </SoloBtn>
                  </FlipcardBackground>
                </FlipcardInner>
              </FlipcardContainer>
            </CardsContainer>
          </OverlayContent>
        </BackgroundWrapper>
      </Inside>
      <LoadingPage></LoadingPage>
    </BackgroundColor>
  );
};

export default FortuneSelect;
