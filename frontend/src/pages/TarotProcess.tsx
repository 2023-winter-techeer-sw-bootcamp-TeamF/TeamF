import Navbar from "../component/Navbar";
import styled from "styled-components";
import BackgroundImg1 from "../assets/Background.png";
import TaroEx1 from "../assets/TaroEx1.png";
import TaroEx2 from "../assets/TaroEx2.png";
import TaroEx3 from "../assets/TaroEx3.png";
import TodayFortune from "../assets/TodayFortune.png";
import NextButton from "../assets/NextBtn.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "../state/atom";
import { io } from "socket.io-client";
import axios from "axios";
import LoadingPage from "../component/LoadingPage";
const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
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
const CardBackground = styled.div`
  width: 8.75rem;
  height: 15rem;
  border-radius: 0.9375rem;
  background: #b99e6f;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TaroEx = styled.img`
  width: 7.72438rem;
  height: 13.90388rem;
`;
const Cards = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  gap: 6.5rem;
  top: 13%;
  left: 28%;
`;
const TaroMaster = styled.img`
  width: 4rem;
  height: 3.9375rem;
  border-radius: 9.375rem;
  position: absolute;
  top: 46%;
  left: 9%;
`;
const ChatBox = styled.div`
  width: 52rem;
  height: 21.9375rem;
  border-radius: 0rem 1.25rem 1.25rem 1.25rem;
  border: 0.0625rem solid #ecb973;
  background: rgba(208, 179, 179, 0);
  position: absolute;
  top: 47%;
  left: 16%;
`;
const Chat = styled.p`
  color: #ecb973;
  font-family: "맑은 고딕";
  font-size: 1.3375rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: capitalize;
  margin: 1.5625rem;
  overflow-y: scroll;
  padding-right: 0.9375rem;
  height: 18rem;
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
const NextBtn = styled.button`
  border: none;
  background: none;
  width: 5.625rem;
  height: 5.125rem;
  position: absolute;
  right: 6rem;
  bottom: 7rem;
  cursor: pointer;
`;
const NextBtnImg = styled.img`
  width: 100%;
  height: 100%;
`;
function TarotProcess() {
  const [streamArray, setStreamArray] = useState("");
  const accesstoken = useRecoilValue(accessTokenState);
  const [trigger, setTrigger] = useState(true);

  const getStream = async () => {
    try {
      const response = await axios.post(
        "/stream/",
        {},
        {
          headers: {
            Authorization: accesstoken,
          },
          params: {
            cards: "1,16,20",
            ask: "요즘 조금 외롭네요",
            luckType: 2,
            poll_id: 94,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const socket = io("http://localhost:3001/", {
    auth: {
      token: accesstoken,
    },
  });
  socket.on("chat message", (msg) => {
    console.log(msg);
    //promptInput();
  });

  socket.on("message", (msg) => {
    console.log(`받은 메시지 :" + ${msg}`);
    setStreamArray((prev) => prev + msg);
  });

  socket.on("connect", () => {
    console.log("서버에 연결되었습니다.");
    if (trigger) getStream();
    setTrigger(false);
  });
  socket.on("disconnect", () => {
    console.log("서버와의 연결이 끊어졌습니다.");
  });

  socket.on("success", () => {
    console.log("연결 작업 성공");
  });

  socket.on("finish", async () => {
    console.log("연결 작업 종료");
    socket.disconnect();
  });
  return (
    <>
      <Background>
        <Inside>
          <LoadingPage></LoadingPage>
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
              <Chat>{streamArray}</Chat>
            </ChatBox>
            <Link to="/cardsave">
              <NextBtn>
                <NextBtnImg src={NextButton} />
              </NextBtn>
            </Link>
          </BackgroundWrapper>
        </Inside>
      </Background>
    </>
  );
}
export default TarotProcess;
