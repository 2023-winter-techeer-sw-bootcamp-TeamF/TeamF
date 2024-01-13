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
  width: 79.4671675rem;
  height: 52.94rem;
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
  padding-top: 0.625rem;
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
  font-size: 1.875rem;
  margin-bottom: 3.5rem;
`;

const ContentContainer = styled.p`
  //타로 마스터의 설명을 참고하여 주제별 운세를 선택해주세요
  color: #ecb973;
  text-align: center;
  font-family: Inter;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: uppercase;
  margin-top: 1.25rem;
  margin-bottom: 6rem;
`;

const CardBox = styled.div`
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
`;

const CardsContainer = styled.div`
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
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 3.125rem;
`;

const CardTitle = styled.span`
  //운 이름
  color: #ecb973;
  text-align: center;
  font-family: Inter;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
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

const FlipcardContainer = styled.div`
  position: relative;
  width: 12.375rem;
  height: 20.75rem;
  perspective: 62.5rem;
`;

const FlipcardInner = styled.div<FlipcardInnerProps>`
  position: relative;
  width: 12.375rem;
  height: 20.75rem;
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
  top: 37%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  color: #fffbf2;
  font-family: "맑은 고딕";
  font-size: 0.86rem;
  width: 9rem;
  line-height: 1.3;
  margin-top: 0.6rem;
`;

const Bold = styled.p`
  color: #fffbf2;
  font-family: Inter;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const SoloBtn = styled.div`
  width: 8.4375rem;
  height: 1.5rem;
  flex-shrink: 0;
  border-radius: 0.9375rem;
  background: #fbecc6;
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const SoloAboveBtn = styled.div`
  width: 8.4375rem;
  height: 1.5rem;
  flex-shrink: 0;
  border-radius: 0.9375rem;
  background: #fbecc6;
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const TogetherBtn = styled.div`
  width: 8.4375rem;
  height: 1.5rem;
  flex-shrink: 0;
  border-radius: 0.9375rem;
  background: #806838;
  position: absolute;
  top: 90%;
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
  font-family: Inter;
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
`;

const TogetherText = styled.p`
  color: #fbecc6;
  text-align: center;
  font-family: Inter;
  font-size: 0.625rem;
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
                      <SoloAboveBtn>
                        <SoloText>혼자 카드 선택하기</SoloText>
                      </SoloAboveBtn>
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
                      <SoloAboveBtn>
                        <SoloText>혼자 카드 선택하기</SoloText>
                      </SoloAboveBtn>
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
