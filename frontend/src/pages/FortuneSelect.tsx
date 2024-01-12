import React, { useState } from "react";
import Navbar from "../component/Navbar";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Background from "../assets/Background.png";
import FriendshipImg from "../assets/Friendship.png";
import LoveFortuneImg from "../assets/LoveFortune.png";
import MoneyFortuneImg from "../assets/MoneyFortune.png";
import TodayFortuneImg from "../assets/TodayFortune.png";
import WishFortuneImg from "../assets/WishFortune.png";
import FlipCard from "../assets/FlipCard.png";

const BackgroundWrapper = styled.div`
  position: relative; // 자식 요소를 절대 위치로 배치하기 위한 설정
  width: 89%;
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
  padding-top: 10px;
`;

const TitleContainer = styled.div`
  //타로 마스터가 여러분의 운세를 봐드립니다
  text-align: center;

  color: #ecb973;
  text-align: center;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-transform: uppercase;
  font-size: 30px;
  margin-bottom: 2.5rem;
`;

const ContentContainer = styled.p`
  //타로 마스터의 설명을 참고하여 주제별 운세를 선택해주세요
  color: #ecb973;
  text-align: center;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: uppercase;
  margin-top: 20px;
`;

const CardBox = styled.div`
  //각 카드 박스
  width: 198px;
  height: 300px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 2px solid #ecb973;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: black;
  position: absolute;
  backface-visibility: hidden;
  transform: rotateY(0deg);

  @media (max-width: 1300px), (max-height: 650px) {
    width: 165px;
    height: 256px;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
`;
const ProfileImage = styled.img`
  // 프로필 이미지
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
  flex-direction: column;
  margin-top: 20px;
  @media (max-width: 1300px), (max-height: 650px) {
    width: 6.5rem;
    height: 6.5rem;
  }
`;

const Question = styled.span`
  // 어떨까?
  color: #ecb973;
  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 50px;
`;

const CardTitle = styled.span`
  //운 이름
  color: #ecb973;
  text-align: center;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
`;

const Inside = styled.div`
  width: 1500px;
  margin-left: auto;
  margin-right: auto;
`;
const FlipCardImg = styled.img`
  width: 198px;
  height: 300px;
  flex-shrink: 0;
  border-radius: 12px;
  display: flex;
  position: relative; // 내부 절대 위치 요소를 위한 상대 위치 설정
  mix-blend-mode: darken;
  @media (max-width: 1300px), (max-height: 650px) {
    width: 165px;
    height: 300px;
  }
`;

const FlipcardBackground = styled.div`
  width: 198px;
  height: 300px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0);
  position: absolute;
  backface-visibility: hidden;
  transform: rotateY(180deg);
`;

const FlipcardContainer = styled.div`
  position: relative;
  width: 198px;
  height: 300px;
  perspective: 1000px;
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

interface FlipcardInnerProps {
  isFlipped: boolean;
}

const CardText = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column; // 가로 방향으로 아이템 정렬
  color: #fffbf2;
  font-family: Inter;
  font-size: 15px;
  width: 80%; // 컨테이너 너비 조절
  max-width: 300px; // 최대 너비 설정
  @media (max-width: 1300px), (max-height: 650px) {
    font-size: 13px;
    top: 38%;
    left: 42%;
    width: 70%;
  }
`;

const Bold = styled.p`
  color: #fffbf2;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  @media (max-width: 1300px), (max-height: 650px) {
    font-size: 13px;
  }
`;
const SoloBtn = styled.div`
  width: 135px;
  height: 24px;
  flex-shrink: 0;
  border-radius: 15px;
  background: #fbecc6;
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media (max-width: 1300px), (max-height: 650px) {
    width: 120px;
    height: 22px;
    top: 77%;
    left: 43%;
  }
`;
const TogetherBtn = styled.div`
  width: 135px;
  height: 24px;
  flex-shrink: 0;
  border-radius: 15px;
  background: #806838;
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media (max-width: 1300px), (max-height: 650px) {
    width: 120px;
    height: 22px;
    top: 86%;
    left: 43%;
  }
`;

const SoloText = styled.p`
  color: #806838;
  text-align: center;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
`;

const TogetherText = styled.p`
  color: #fbecc6;
  text-align: center;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
`;

const FortuneSelect = () => {
  const [flippedCards, setFlippedCards] = useState(Array(10).fill(false));

  // 카드를 뒤집는 함수
  const handleFlip = (flip: number) => {
    const newFlippedCards = [...flippedCards];
    newFlippedCards[flip] = !newFlippedCards[flip];
    setFlippedCards(newFlippedCards);
  };
  return (
    <BackgroundColor>
      <Inside>
        <Navbar />
        <BackgroundWrapper>
          <BackgroundImg src={Background} />
          <OverlayContent>
            <TitleContainer>
              타로 마스터가
              <br /> 여러분의 운세를 봐드립니다!
            </TitleContainer>
            <ContentContainer>
              타로 마스터의 설명을 참고하여
              <br /> 주제별 운세를 선택해주세요
            </ContentContainer>
            <CardsContainer>
              <FlipcardContainer onClick={() => handleFlip(0)}>
                <FlipcardInner isFlipped={flippedCards[0]}>
                  <CardBox>
                    <ProfileImage src={TodayFortuneImg} />
                    <Question>나의 오늘은 어떨까?</Question>
                    <CardTitle>오늘의 운세</CardTitle>
                  </CardBox>
                  <FlipcardBackground>
                    <FlipCardImg src={FlipCard} />
                    <CardText>
                      킹왕짱 마스터는 어쩌구, 저쩌구, 요따구 능력을 지닌 타로
                      마스터에요. <Bold>오늘의 운세</Bold>는 타로 마스터와의
                      고민 상담없이 바로 카드 선택이 진행돼요. 여러분의
                      <Bold> 오늘의 운세</Bold>를 타로 카드와 함께 자세히
                      분석해드릴게요.
                    </CardText>
                    <Link to="/todayfortune">
                      <SoloBtn>
                        <SoloText>오늘의 운세 보러가기</SoloText>
                      </SoloBtn>
                    </Link>
                  </FlipcardBackground>
                </FlipcardInner>
              </FlipcardContainer>

              <FlipcardContainer onClick={() => handleFlip(1)}>
                <FlipcardInner isFlipped={flippedCards[1]}>
                  <CardBox>
                    <ProfileImage src={LoveFortuneImg} />
                    <Question>우리 사이 애정은?</Question>
                    <CardTitle>연애운</CardTitle>
                  </CardBox>
                  <FlipcardBackground>
                    <FlipCardImg src={FlipCard} />
                    <CardText>
                      퀸왕짱 마스터는 어쩌구, 저쩌구, 요따구 능력을 지닌 타로
                      마스터에요. <Bold>연애운</Bold>은 혼자 또는 두명이 함께
                      카드를 선택할 수 있어요. 퀸왕짱 마스터에게 여러분의 고민을
                      솔직하게 얘기해주신다면 타로 카드와 함께 자세히
                      분석해드릴게요.
                    </CardText>
                    <Link to="/lovefortune">
                      <SoloBtn>
                        <SoloText>혼자 카드 선택하기</SoloText>
                      </SoloBtn>
                    </Link>
                    <Link to="/lovefortune">
                      <TogetherBtn>
                        <TogetherText>함께 카드 선택하기</TogetherText>
                      </TogetherBtn>
                    </Link>
                  </FlipcardBackground>
                </FlipcardInner>
              </FlipcardContainer>

              <FlipcardContainer onClick={() => handleFlip(2)}>
                <FlipcardInner isFlipped={flippedCards[2]}>
                  <CardBox>
                    <ProfileImage src={FriendshipImg} />
                    <Question>우리 사이 우정은?</Question>
                    <CardTitle>우정운</CardTitle>
                  </CardBox>
                  <FlipcardBackground>
                    <FlipCardImg src={FlipCard} />
                    <CardText>
                      할매짱 마스터는 어쩌구, 저쩌구, 요따구 능력을 지닌 타로
                      마스터에요. <Bold>우정운</Bold>은 혼자 또는 두명이 함께
                      카드를 선택할 수 있어요. 퀸왕짱 마스터에게 여러분의 고민을
                      솔직하게 얘기해주신다면 타로 카드와 함께 자세히
                      분석해드릴게요.
                    </CardText>
                    <Link to="/friendship">
                      <SoloBtn>
                        <SoloText>혼자 카드 선택하기</SoloText>
                      </SoloBtn>
                    </Link>
                    <Link to="/friendship">
                      <TogetherBtn>
                        <TogetherText>함께 카드 선택하기</TogetherText>
                      </TogetherBtn>
                    </Link>
                  </FlipcardBackground>
                </FlipcardInner>
              </FlipcardContainer>
              <FlipcardContainer onClick={() => handleFlip(3)}>
                <FlipcardInner isFlipped={flippedCards[3]}>
                  <CardBox>
                    <ProfileImage src={MoneyFortuneImg} />
                    <Question>나 부자될 수 있을까?</Question>
                    <CardTitle>재물운</CardTitle>
                  </CardBox>
                  <FlipcardBackground>
                    <FlipCardImg src={FlipCard} />
                    <CardText>
                      할배짱 마스터는 어쩌구, 저쩌구, 요따구 능력을 지닌 타로
                      마스터에요. <Bold>재물운</Bold>은 혼자 또는 두명이 함께
                      카드를 선택할 수 있어요. 퀸왕짱 마스터에게 여러분의 고민을
                      솔직하게 얘기해주신다면 타로 카드와 함께 자세히
                      분석해드릴게요.
                    </CardText>
                    <Link to="/moneyfortune">
                      <SoloBtn>
                        <SoloText>혼자 카드 선택하기</SoloText>
                      </SoloBtn>
                    </Link>
                  </FlipcardBackground>
                </FlipcardInner>
              </FlipcardContainer>
              <FlipcardContainer onClick={() => handleFlip(4)}>
                <FlipcardInner isFlipped={flippedCards[4]}>
                  <CardBox>
                    <ProfileImage src={WishFortuneImg} />
                    <Question>이룰 수 있을까?</Question>
                    <CardTitle>소망운</CardTitle>
                  </CardBox>
                  <FlipcardBackground>
                    <FlipCardImg src={FlipCard} />
                    <CardText>
                      개굴짱 마스터는 어쩌구, 저쩌구, 요따구 능력을 지닌 타로
                      마스터에요. <Bold>소망운</Bold>은 혼자 또는 두명이 함께
                      카드를 선택할 수 있어요. 퀸왕짱 마스터에게 여러분의 고민을
                      솔직하게 얘기해주신다면 타로 카드와 함께 자세히
                      분석해드릴게요.
                    </CardText>
                    <Link to="/wishfortune">
                      <SoloBtn>
                        <SoloText>혼자 카드 선택하기</SoloText>
                      </SoloBtn>
                    </Link>
                  </FlipcardBackground>
                </FlipcardInner>
              </FlipcardContainer>
            </CardsContainer>
          </OverlayContent>
        </BackgroundWrapper>
      </Inside>
    </BackgroundColor>
  );
};

export default FortuneSelect;
