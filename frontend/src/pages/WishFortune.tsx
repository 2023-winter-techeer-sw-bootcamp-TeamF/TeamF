import Navbar from "../component/Navbar";
import styled from "styled-components";
import Background from "../assets/Background.png";
import WishFortuneImg from "../assets/WishFortune.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { pollIdState, accessTokenState, replyState } from "../state/atom.ts";
import LoadingPage from "../component/LoadingPage";
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
  height: 13.25rem;
  flex-shrink: 0;
  border-radius: 0rem 1.25rem 1.25rem 1.25rem;
  border: 0.0625rem solid #ecb973;
  transform: translate(32%, -300%);
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
  height: 96%;
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

const Profile2 = styled.img`
  width: 4rem;
  height: 3.9375rem;
  flex-shrink: 0;
  border-radius: 9.375rem;
  position: absolute;
  top: 104%;
  left: 50%;
  transform: translate(-811%, -441%);
`;

const NextBox = styled.div`
  width: 14.6875rem;
  height: 5rem;
  border-radius: 0rem 1.25rem 1.25rem 1.25rem;
  border: 1px solid #ecb973;
  background: rgba(236, 185, 115, 0);
  transform: translate(85%, -689%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NextText = styled.a`
  color: #ecb973;
  text-align: center;
  font-family: Inter;
  font-size: 1.4375rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-decoration-line: underline;
  text-transform: capitalize;
  cursor: pointer;
`;

const WishFortune = () => {
  const navigate = useNavigate();
  const setPollId = useSetRecoilState(pollIdState);
  const accessToken = useRecoilValue(accessTokenState);
  const [reply, setReply] = useRecoilState(replyState);
  const [tellMeText, setTellMeText] = useState(""); //useState TellMeText를 빈칸으로 선언
  // const로 선언했을 때 불변값이라 값을 변화하면 에러 생김
  const getText = (): void => {
    axios
      .get("/tarot/guide", {
        params: {
          //await: 비동기 함수 안에서 promise 객체가 처리될 때까지 기다림
          luckType: "test_luck",
          luckOpt: 0,
        },
      })
      .then((res) => {
        console.log(res.data.data.content);
        setTellMeText(res.data.data.content); //set@=텍스트 값 바꿈
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNextButton = () => {
    axios
      .get("/poll/create", {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        console.log("성공", response.data);
        setPollId(response.data.data.pollId);
        navigate("/cardselect");
      })
      .catch((error) => {
        console.error("실패:", error);
      });
    console.log("Reply 내용:", reply);
  };

  const handleReplyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReply(event.target.value);
  };

  useEffect(() => {
    getText();
  }, []);
  return (
    <BackgroundColor>
      <Inside>
        <LoadingPage></LoadingPage>
        <Navbar />
        <BackgroundWrapper>
          <Profile src={WishFortuneImg}></Profile>
          <TitleBox>
            <TitleContent>소망운 타로 마스터와의 대화</TitleContent>
          </TitleBox>
          <BackgroundImg src={Background} alt="Background" />
          <ChatBox>
            <Tellme>{tellMeText}</Tellme>
          </ChatBox>
          <ReplyBox>
            <Reply
              placeholder="이곳에 고민을 적어주세요"
              value={reply}
              onChange={handleReplyChange}
            ></Reply>
          </ReplyBox>
          <Profile2 src={WishFortuneImg}></Profile2>
          <NextBox>
            <NextText onClick={handleNextButton}>카드 뽑으러 가기</NextText>
          </NextBox>
        </BackgroundWrapper>
      </Inside>
    </BackgroundColor>
  );
};
export default WishFortune;
