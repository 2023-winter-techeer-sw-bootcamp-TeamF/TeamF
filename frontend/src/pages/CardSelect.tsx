import React from "react";
import Navbar from "../component/Navbar";
import styled from "styled-components";
import Background from "../assets/Background.png";
import TaroEx1 from "../assets/TaroEx1.png";
import TaroEx2 from "../assets/TaroEx2.png";
import TaroEx3 from "../assets/TaroEx3.png";
import BackOfCard from "../assets/BackOfCard.png";
import NextButton from "../assets/NextButton.png";

const BackgroundColor = styled.div`
  background: #000;
  width: 100vw;
  height: 100vh;
  padding-top: 10px;
`;

const BackgroundWrapper = styled.div`
  position: relative; // 자식 요소를 절대 위치로 배치하기 위한 설정
  width: 97%;
  height: 89vh;
  @media (max-width: 1300px) {
    width: 85%;
    height: 89vh;
  }
`;

const BackgroundImg = styled.img`
  width: 100%;
  height: 100%;
`;

const Inside = styled.div`
  width: 1500px;
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

  @media (max-width: 1300px) {
    width: 8rem;
    height: 14rem;
  }
`;

const TaroEx = styled.img`
  width: 7.72438rem;
  height: 13.90388rem;

  @media (max-width: 1300px) {
    width: 7rem;
    height: 13rem;
  }
`;

const Cards = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  gap: 6.5rem;
  top: 13%;
  left: 28%;
`;

const BackcardBackground = styled.div`
  width: 139.343px;
  height: 238.254px;
  border-radius: 15px;
  background: #b99e6f;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;

  @media (max-width: 1300px) {
    width: 8rem;
    height: 14rem;

    img {
      width: 7.2rem;
      height: 13rem;
    }
  }
`;

const StackedCardsContainer = styled.div`
  position: relative;
  height: 238.254px; // 자식 컨테이너(BackcardBackground)와 같은 높이
  width: 100%; // 또는 전체 카드가 겹치는 너비에 맞게 조정
  bottom: 45%;
  left: 73.3%;
  @media (max-width: 1300px) {
    bottom: 45%;
    left: 127%;
    transform: translateX(-50%);
  }
`;

const NextBtn = styled.button`
  border: none;
  background: none;
  width: 3.75rem;
  height: 3.75rem;
  background-image: url(${NextButton});
  position: absolute;
  right: 8rem;
  bottom: 10.5rem;
  cursor: pointer;

  @media (max-width: 1300px) {
    width: 3.5rem;
    height: 4rem;
    right: 5rem;
    bottom: 10.5rem;
  }
`;

const BeforeBtn = styled.button`
  border: none;
  background: none;
  width: 3.75rem;
  height: 3.75rem;
  background-image: url(${NextButton});
  position: absolute;
  right: 79rem;
  bottom: 10.5rem;
  cursor: pointer;
  transform: rotate(180deg);

  @media (max-width: 1300px) {
    width: 3.5rem;
    height: 4rem;
    right: 71rem;
    bottom: 10.5rem;
  }
`;

const CardSelect = () => {
  const NumberOfCards = 28; // 겹칠 카드의 수
  const Overlap = -30; // 카드 겹침 정도

  return (
    <BackgroundColor>
      <Inside>
        <Navbar />
        <BackgroundWrapper>
          <BackgroundImg src={Background} alt="Background" />
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
          <StackedCardsContainer>
            {Array.from({ length: NumberOfCards }).map((_, index) => (
              <BackcardBackground
                key={index}
                style={{
                  left: `${index * Overlap}px`,
                  zIndex: NumberOfCards - index,
                }}
              >
                <img src={BackOfCard} alt="Card back" />
              </BackcardBackground>
            ))}
          </StackedCardsContainer>
          <NextBtn></NextBtn>
          <BeforeBtn></BeforeBtn>
        </BackgroundWrapper>
      </Inside>
    </BackgroundColor>
  );
};

export default CardSelect;
