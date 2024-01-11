import React from "react";
import Navbar from "../component/Navbar";
import styled from "styled-components";
import Background from "../assets/Background.png";
import Moneyfortuneimg from "../assets/MoneyFortune.png";

const BackgroundColor = styled.div`
  background: #000;
  width: 100vw;
  height: 100vh;
  padding-top: 10px;
`;

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

const Inside = styled.div`
  width: 1500px;
  margin-left: auto;
  margin-right: auto;
`;

const TitleBox = styled.div`
  border-radius: 30px;
  background: rgba(51, 51, 51, 0.9);
  width: 300px;
  height: 50px;
  flex-shrink: 0;
  position: absolute; // 부모 컨테이너인 BackgroundWrapper에 상대적인 위치
  top: 12%;
  left: 39%;
  text-align: center;
  @media screen and (max-width: 1300px), (max-height: 650px) {
    display: none;
  }
`;

const TitleContent = styled.p`
  color: #fff;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 350;
  line-height: normal;
  text-transform: capitalize;
  margin-top: 13px;

  @media screen and (max-width: 1300px), (max-height: 650px) {
    font-size: 18px;
  }
`;

const Profile = styled.img`
  width: 64px;
  height: 63px;
  flex-shrink: 0;
  border-radius: 150px;
  background: url(<path-to-image>), lightgray 50% / contain no-repeat;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-950%, -250%);
  @media screen and (max-width: 1300px), (max-height: 650px) {
    top: 43%;
    left: 57%;
    transform: translate(-1000%, -260%);
  }
`;

const ChatBox = styled.div`
  width: 634px;
  height: 260px;
  flex-shrink: 0;
  border-radius: 0px 20px 20px 20px;
  border: 1px solid #ecb973;
  transform: translate(35%, -190%);
  padding: 22px;
  @media screen and (max-width: 1300px), (max-height: 650px) {
    width: 611px;
    height: 239px;
    transform: translate(28%, -200%);
    padding: 10px;
  }
`;

const Tellme = styled.p`
  color: #ecb973;
  font-family: Inter;
  font-size: 23px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: left;
  overflow-y: scroll;
  height: 13rem;
  padding-right: 1rem;
  &::-webkit-scrollbar {
    width: 5px; /* 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ecb973; /* 황금색 스크롤바 색상 */
    border-radius: 4px; /* 스크롤바 모양 (둥근 모서리) */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #daa520; /* 호버시 색상 변경 (더 진한 황금색) */
  }
  @media screen and (max-width: 1300px), (max-height: 650px) {
    font-size: 20px;
  }
`;

const ReplyBox = styled.div`
  width: 634px;
  height: 109px;
  flex-shrink: 0;
  border-radius: 20px 0px 20px 20px;
  border: 1px solid #fff;
  padding: 15px;
  display: flex;
  transform: translate(110%, -420%);
  @media screen and (max-width: 1300px), (max-height: 650px) {
    transform: translate(85%, -420%);
  }
`;

const Reply = styled.textarea`
  color: #fff;
  background-color: #000;
  width: 600px;
  text-align: right;
  font-family: Inter;
  font-size: 23px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  overflow-y: scroll;
  padding-right: 1rem;
  outline: none;
  border: none;
  resize: none;
  &::-webkit-scrollbar {
    width: 5px; /* 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #e1ded9; /* 연한 흰색 */
    border-radius: 4px; /* 스크롤바 모양 (둥근 모서리) */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #ffffff; /* 호버시 색상 변경 (흰색) */
  }
  &::placeholder {
    color: #fff;
    background-color: #000;
    font-size: 23px;
    padding-right: 1rem;
  }

  @media screen and (max-width: 1300px), (max-height: 650px) {
    font-size: 20px;
  }
`;

const MoneyFortune = () => {
  return (
    <BackgroundColor>
      <Inside>
        <Navbar />
        <BackgroundWrapper>
          <Profile src={Moneyfortuneimg}></Profile>
          <TitleBox>
            <TitleContent>OO운 타로 마스터와의 대화</TitleContent>
          </TitleBox>
          <BackgroundImg src={Background} alt="Background" />
          <ChatBox>
            <Tellme>
              타로점을 볼 때 주의할 점 자! 이제 너의 고민을 말해봐. 타로점을 볼
              때 주의할 점 자! 이제 너의 고민을 말해봐. 타로점을 볼 때 주의할 점
              자! 이제 너의 고민을 말해봐. 타로점을 볼 때 주의할 점 자! 이제
              너의 고민을 말해봐. 타로점을 볼 때 주의할 점 자! 이제 너의 고민을
              말해봐.타로점을 볼 때 주의할 점 자! 이제 너의 고민을 말해봐.
              타로점을 볼 때 주의할 점 자! 이제 너의 고민을 말해봐.타로점을 볼
              때 주의할 점 자! 이제 너의 고민을 말해봐.타로점을 볼 때 주의할 점
              자! 이제 너의 고민을 말해봐.타로점을 볼 때 주의할 점 자! 이제 너의
              고민을 말해봐.
            </Tellme>
          </ChatBox>
          <ReplyBox>
            <Reply placeholder="자! 이제 네 고민을 말해봐."></Reply>
          </ReplyBox>
        </BackgroundWrapper>
      </Inside>
    </BackgroundColor>
  );
};
export default MoneyFortune;
