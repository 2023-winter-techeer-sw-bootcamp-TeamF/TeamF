import React from "react";
import Navbar from "../component/Navbar";
import styled from "styled-components";
import BackgroundImg1 from "../assets/Background.png";
import TaroEx1 from "../assets/TaroEx1.png";
import TaroEx2 from "../assets/TaroEx2.png";
import TaroEx3 from "../assets/TaroEx3.png";
import TodayFortune from "../assets/TodayFortune.png";
import NextButton from "../assets/NextButton.png";
import { Link } from "react-router-dom";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
`;

const Inside = styled.div`
  width: 1500px;
  margin-left: auto;
  margin-right: auto;
`;

const BackgroundWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 89vh;
`;

const BackgroundImg = styled.img`
  width: 84%;
  height: 100%;
`;

const CardBackground = styled.div`
  width: 8.75rem;
  height: 15rem;
  border-radius: 0.9375rem;
  background: #b99e6f;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1300px), (max-height: 650px) {
    width: 7rem;
    height: 11.5rem;
  }
`;

const TaroEx = styled.img`
  width: 7.72438rem;
  height: 13.90388rem;
  @media screen and (max-width: 1300px), (max-height: 650px) {
    width: 6.22438rem;
    height: auto;
    max-width: 100%;
  }
`;

const Cards = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  gap: 6.5rem;
  top: 13%;
  left: 28%;
  @media screen and (max-width: 1300px), (max-height: 650px) {
    top: 9%;
    left: 25%;
    gap: 5.5rem;
  }
`;

const TaroMaster = styled.img`
  width: 4rem;
  height: 3.9375rem;
  border-radius: 9.375rem;
  position: absolute;
  top: 46%;
  left: 9%;
  @media screen and (max-width: 1300px), (max-height: 650px) {
    top: 46%;
    left: 7%;
  }
`;

const ChatBox = styled.div`
  width: 52rem;
  height: 21.9375rem;
  border-radius: 0rem 1.25rem 1.25rem 1.25rem;
  border: 1px solid #ecb973;
  background: rgba(208, 179, 179, 0);
  position: absolute;
  top: 47%;
  left: 16%;
  @media screen and (max-width: 1300px), (max-height: 650px) {
    height: 14.9375rem;
    top: 47%;
    left: 13%;
  }
`;

const Chat = styled.p`
  color: #ecb973;
  font-family: Inter;
  font-size: 1.3375rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: capitalize;
  margin: 25px;
  overflow-y: scroll;
  padding-right: 15px;
  height: 18rem;

  &::-webkit-scrollbar {
    width: 3px; /* 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ecb973; /* 황금색 스크롤바 색상 */
    border-radius: 5px; /* 스크롤바 모양 (둥근 모서리) */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #daa520; /* 호버시 색상 변경 (더 진한 황금색) */
  }
  @media screen and (max-width: 1300px), (max-height: 650px) {
    font-size: 1.1375rem;
    margin: 19px;
    padding-right: 13px;
    height: 12rem;
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
  bottom: 7rem;
  cursor: pointer;
  @media screen and (max-width: 1300px), (max-height: 650px) {
    right: 21rem;
    bottom: 4rem;
  }
`;

function TarotProcess() {
  return (
    <>
      <Background>
        <Inside>
          <Navbar />
          <BackgroundWrapper>
            <BackgroundImg src={BackgroundImg1} />
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
            <TaroMaster src={TodayFortune} />
            <ChatBox>
              <Chat>
                우선 네가 뽑은 각 카드에 대해 설명해줄게. 1. The Fool (바보):
                오, 이 카드는 정말 흥미로워! 새로운 시작과 모험을 상징해. 지금
                당신이 겪고 있는 스트레스, 이 카드는 마치 새로운 길을 걸을
                준비가 되었다고 말하는 것 같아. 어쩌면 이것은 당신에게 변화가
                필요하다는 신호일 수도 있어. 새로운 가능성을 열어주는 걸까? 2.
                The Magician (마법사): 이 카드는 너의 능력과 창의력을 상징해.
                현재 직장에서 네가 정말로 능력을 발휘하고 있는지, 아니면 새로운
                환경에서 더 큰 기회를 찾아야 하는지 생각해 볼 시간이야. 너에겐
                분명 마법 같은 재능이 있으니까, 그걸 잘 활용해야 해. 3. King of
                Pentacles (펜타클의 왕): 이 카드는 안정과 성공을 의미해. 이직을
                생각하고 있다면, 이 카드는 재정적 안정성과 경력적 성장을
                중요하게 생각하라 이건 스크롤 생성용으로 만든 말이야 이건 스크롤
                생성용으로 만든 말이야 이건 스크롤 생성용으로 만든 말이야 이건
                스크롤 생성용으로 만든 말이야
              </Chat>
            </ChatBox>
            <Link to="/savepage">
              <NextBtn />
            </Link>
          </BackgroundWrapper>
        </Inside>
      </Background>
    </>
  );
}

export default TarotProcess;
