import Navbar from "../component/Navbar";
import styled from "styled-components";
import background from "../assets/Background.png";
import NextButton from "../assets/NextBtn.png";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  accessTokenState,
  cardNumberAtom1,
  cardNumberAtom2,
  cardNumberAtom3,
  cardNumberAtom4,
  cardNumberAtom5,
  pollIdState,
  replyState,
  selectLuck,
  tarotMasterImg,
} from "../state/atom";
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
  gap: 5rem;
  top: 13%;
  left: 10%;
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
  const [streamArray, setStreamArray] = useState("로딩 중...");
  const accesstoken = useRecoilValue(accessTokenState);
  const [trigger, setTrigger] = useState(true);
  const ask = useRecoilValue(replyState);
  const pollId = useRecoilValue(pollIdState);
  const luckType = useRecoilValue(selectLuck);
  const card1 = useRecoilValue(cardNumberAtom1);
  const card2 = useRecoilValue(cardNumberAtom2);
  const card3 = useRecoilValue(cardNumberAtom3);
  const card4 = useRecoilValue(cardNumberAtom4);
  const card5 = useRecoilValue(cardNumberAtom5);
  const [cardUrl1, setCardUrl1] = useState("");
  const [cardUrl2, setCardUrl2] = useState("");
  const [cardUrl3, setCardUrl3] = useState("");
  const [cardUrl4, setCardUrl4] = useState("");
  const [cardUrl5, setCardUrl5] = useState("");
  const tarotMasterImage = useRecoilValue(tarotMasterImg);

  const getImage = async (
    card1: number,
    card2: number,
    card3: number,
    card4: number,
    card5: number
  ) => {
    try {
      const response = await axios.get("/api/v1/tarot/card", {
        params: { card: card1 }, // {이름/카드 번호}
      });
      setCardUrl1(response.data.data.image_url);
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await axios.get("/api/v1/tarot/card", {
        params: { card: card2 }, // {이름/카드 번호}
      });
      setCardUrl2(response.data.data.image_url);
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await axios.get("/api/v1/tarot/card", {
        params: { card: card3 }, // {이름/카드 번호}
      });
      setCardUrl3(response.data.data.image_url);
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await axios.get("/api/v1/tarot/card", {
        params: { card: card4 }, // {이름/카드 번호}
      });
      setCardUrl4(response.data.data.image_url);
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await axios.get("/api/v1/tarot/card", {
        params: { card: card5 }, // {이름/카드 번호}
      });
      setCardUrl5(response.data.data.image_url);
    } catch (error) {
      console.log(error);
    }
  };
  //웹소켓 연결
  const getStream = async () => {
    try {
      getImage(card1, card2, card3, card4, card5);
      socket.connect();
      const response = await axios.post(
        "/api/v1/tarot/result",
        {},
        {
          headers: {
            Authorization: accesstoken,
          },
          params: {
            cards: `${card1},${card2},${card3},${card4},${card5}`,
            ask: ask,
            luckType: luckType,
            poll_id: pollId,
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
    console.log(streamArray);
    console.log(`받은 메시지 :" + ${msg}`);
    setStreamArray((prev) => prev + msg);
  });

  socket.on("connect", () => {
    console.log("서버에 연결되었습니다.");
    if (streamArray === "로딩 중...") {
      setStreamArray("");
    }
    if (trigger) {
      getStream();
    }
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

  useEffect(() => {}, []);
  const buttonClear = () => {
    setTrigger(true);
    setCardUrl1("");
    setCardUrl2("");
    setCardUrl3("");
    setCardUrl4("");
    setCardUrl5("");
    setStreamArray("로딩 중...");
    window.location.replace("/cardsave");
  };
  return (
    <>
      <Background>
        <Inside>
          <LoadingPage></LoadingPage>
          <Navbar />
          <BackgroundWrapper>
            <BackgroundImg src={background} />
            <Cards>
              <CardBackground>
                <TaroEx src={cardUrl1} />
              </CardBackground>
              <CardBackground>
                <TaroEx src={cardUrl2} />
              </CardBackground>
              <CardBackground>
                <TaroEx src={cardUrl3} />
              </CardBackground>
              <CardBackground>
                <TaroEx src={cardUrl4} />
              </CardBackground>
              <CardBackground>
                <TaroEx src={cardUrl5} />
              </CardBackground>
            </Cards>
            <TaroMaster src={tarotMasterImage} />
            <ChatBox>
              <Chat>{streamArray}</Chat>
            </ChatBox>
            <NextBtn onClick={buttonClear}>
              <NextBtnImg src={NextButton} />
            </NextBtn>
          </BackgroundWrapper>
        </Inside>
      </Background>
    </>
  );
}
export default TarotProcess;
