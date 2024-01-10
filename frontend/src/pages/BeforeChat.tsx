import React from "react";
import Navbar from "../component/Navbar";
import styled from "styled-components";
import Background from "../assets/Background.png";
import TodayFortune from "../assets/TodayFortune.png";

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
  @media screen and (max-width: 1300px) {
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -500%);
  text-align: center;
  @media screen and (max-width: 1300px) {
    width: 270px;
    height: 40px;
    top: 45%; // 글자가 세로 방향에서 가운데로 가게 하려면?
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

  @media screen and (max-width: 1300px) {
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
`;

const ChatBox = styled.div`
  width: 634px;
  height: 260px;
  flex-shrink: 0;
  border-radius: 0px 20px 20px 20px;
  border: 1px solid #ecb973;
  transform: translate(35%, -190%);
  padding: 22px;
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
`;

const Reply = styled.p`
  color: #fff;
  text-align: right;
  font-family: Inter;
  font-size: 23px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  overflow-y: scroll;
  padding-right: 1rem;
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
`;

const BeforeChat = () => {
  return (
    <BackgroundColor>
      <Inside>
        <Navbar />
        <BackgroundWrapper>
          <Profile src={TodayFortune}></Profile>
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
            <Reply>
              일하는데 스트레스를 너무 많이 받습니다. 이직을 하면 좋을 지 아니면
              더 적응을 해야할 지 알려주세요. 타로점을 볼 때 주의할 점
              <br /> .<br /> . <br />. <br />. <br />.
              <br /> .<br /> .<br /> .<br />
              <br />
              <br />
              <br /> 자! 이제 너의 고민을 말해봐.
            </Reply>
          </ReplyBox>
        </BackgroundWrapper>
      </Inside>
    </BackgroundColor>
  );
};
export default BeforeChat;
