import React from "react";
import Navbar from "../component/Navbar";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Background from "../assets/Background.png";
import FriendshipImg from "../assets/Friendship.png";
import LoveFortuneImg from "../assets/LoveFortune.png";
import MoneyFortuneImg from "../assets/MoneyFortune.png";
import TodayFortuneImg from "../assets/TodayFortune.png";
import WishFortuneImg from "../assets/WishFortune.png";
const BackgroundWrapper = styled.div`
  position: relative; // 자식 요소를 절대 위치로 배치하기 위한 설정
  width: 100%;
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
  position: relative; // 내부 절대 위치 요소를 위한 상대 위치 설정

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

const CardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: inherit;
`;

const Inside = styled.div`
  width: 1500px;
  margin-left: auto;
  margin-right: auto;
`;

const FortuneSelect = () => {
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
              <CardBox>
                <CardLink to="/todayfortune">
                  <ProfileImage src={TodayFortuneImg} />
                  <Question>나의 오늘은 어떨까?</Question>
                  <CardTitle>오늘의 운세</CardTitle>
                </CardLink>
              </CardBox>
              <CardBox>
                <CardLink to="/lovefortune">
                  <ProfileImage src={LoveFortuneImg} />
                  <Question>우리 사이 애정은?</Question>
                  <CardTitle>연애운</CardTitle>
                </CardLink>
              </CardBox>
              <CardBox>
                <CardLink to="/friendship">
                  <ProfileImage src={FriendshipImg} />
                  <Question>우리 사이 우정은?</Question>
                  <CardTitle>우정운</CardTitle>
                </CardLink>
              </CardBox>
              <CardBox>
                <CardLink to="/moneyfortune">
                  <ProfileImage src={MoneyFortuneImg} />
                  <Question>나 부자될 수 있을까?</Question>
                  <CardTitle>재물운</CardTitle>
                </CardLink>
              </CardBox>
              <CardBox>
                <CardLink to="/wishfortune">
                  <ProfileImage src={WishFortuneImg} />
                  <Question>이룰 수 있을까?</Question>
                  <CardTitle>소망운</CardTitle>
                </CardLink>
              </CardBox>
            </CardsContainer>
          </OverlayContent>
        </BackgroundWrapper>
      </Inside>
    </BackgroundColor>
  );
};

export default FortuneSelect;
