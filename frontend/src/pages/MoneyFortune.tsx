import React from "react";
import Navbar from "../component/Navbar";
import styled from "styled-components";
import Background from "../assets/Background.png";
import Moneyfortuneimg from "../assets/MoneyFortune.png";

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

const TitleBox = styled.div`
  border-radius: 1.875rem;
  background: rgba(51, 51, 51, 0.9);
  width: 19.45rem;
  height: 3.125rem;
  flex-shrink: 0;
  position: absolute; // 부모 컨테이너인 BackgroundWrapper에 상대적인 위치
  top: 12%;
  left: 37%;
  text-align: center;
`;

const TitleContent = styled.p`
  color: #fff;
  font-family: 맑은 고딕;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 350;
  line-height: normal;
  text-transform: capitalize;
  margin-top: 0.6125rem;
`;

const Profile = styled.img`
  width: 4rem;
  height: 3.9375rem;
  flex-shrink: 0;
  border-radius: 9.375rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-811%, -366%);
`;

const ChatBox = styled.div`
  width: 39.625rem;
  height: 20.25rem;
  flex-shrink: 0;
  border-radius: 0rem 1.25rem 1.25rem 1.25rem;
  border: 0.0625rem solid #ecb973;
  transform: translate(32%, -198%);
  padding: 1.375rem;
`;

const Tellme = styled.p`
  color: #ecb973;
  font-family: Inter;
  font-size: 1.4375rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: left;
  overflow-y: scroll;
  height: 17rem;
  padding-right: 1rem;
  line-height: 1.5;
  &::-webkit-scrollbar {
    width: 0.3125rem; /* 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ecb973; /* 황금색 스크롤바 색상 */
    border-radius: 0.25rem; /* 스크롤바 모양 (둥근 모서리) */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #daa520; /* 호버시 색상 변경 (더 진한 황금색) */
  }
`;

const ReplyBox = styled.div`
  width: 39.625rem;
  height: 6.8125rem;
  border-radius: 1.25rem 0rem 1.25rem 1.25rem;
  border: 0.0625rem solid #fff;
  padding: 0.9375rem;
  display: flex;
  transform: translate(80%, -542%);
`;

const Reply = styled.textarea`
  color: #fff;
  background-color: #000;
  width: 37.5rem;
  text-align: left;
  font-family: Inter;
  font-size: 1.4375rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.4;
  overflow-y: scroll;
  padding-right: 1rem;
  outline: none;
  border: none;
  resize: none;
  &::-webkit-scrollbar {
    width: 0.3125rem; /* 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #e1ded9; /* 연한 흰색 */
    border-radius: 0.25rem; /* 스크롤바 모양 (둥근 모서리) */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #ffffff; /* 호버시 색상 변경 (흰색) */
  }
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
    background-color: #000;
    font-size: 1.4375rem;
    padding-right: 1rem;
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
            <TitleContent>재물운 타로 마스터와의 대화</TitleContent>
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
            <Reply placeholder="이곳에 고민을 적어주세요"></Reply>
          </ReplyBox>
        </BackgroundWrapper>
      </Inside>
    </BackgroundColor>
  );
};

export default MoneyFortune;
