import Navbar from "../component/Navbar";
import styled from "styled-components";
import Background from "../assets/Background.png";
import TodayFortuneImg from "../assets/TodayFortune.png";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import LoadingPage from "../component/LoadingPage";
import {
  pollIdState,
  accessTokenState,
  replyState,
  selectLuck,
  tarotMasterImg,
} from "../state/atom.ts";
import "../assets/font-YUniverse-B.css";
const BackgroundColor = styled.div`
  background: #000;
  width: 100vw;
  height: 100vh;
`;
const BackgroundWrapper = styled.div`
  position: relative; // 자식 요소를 절대 위치로 배치하기 위한 설정
  width: 79.4671675rem;
  height: 52.94rem;
  margin: auto;
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
  width: 22.75rem;
  height: 3.125rem;
  flex-shrink: 0;
  position: absolute; // 부모 컨테이너인 BackgroundWrapper에 상대적인 위치
  top: 12%;
  left: 36%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TitleContent = styled.p`
  color: #fff;
  font-family: YUniverse-B;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  text-transform: capitalize;
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
  font-family: YUniverse-B;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 300;
  text-align: left;
  overflow-y: scroll;
  height: 96%;
  padding-right: 1rem;
  line-height: 1.4;
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
  font-family: YUniverse-B;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 300;
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
const NextBox2 = styled.div`
  width: 14.6875rem;
  height: 7rem;
  border-radius: 0rem 1.25rem 1.25rem 1.25rem;
  border: 1px solid #ecb973;
  background: rgba(236, 185, 115, 0);
  transform: translate(85%, -489%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.7rem;
`;
const NextText = styled.a`
  color: #ecb973;
  text-align: center;
  font-family: YUniverse-B;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  text-decoration-line: underline;
  text-transform: capitalize;
  cursor: pointer;
  line-height: 1.4;
`;

const NextText2 = styled.a`
  color: #ecb973;
  text-align: center;
  font-family: YUniverse-B;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  text-transform: capitalize;
  cursor: pointer;
  line-height: 1.4;
`;
const TodayFortune = () => {
  const navigate = useNavigate();
  const setPollId = useSetRecoilState(pollIdState);
  const accessToken = useRecoilValue(accessTokenState);
  const [reply, setReply] = useRecoilState(replyState);
  const tellMeText =
    "별빛처럼 신비한 오늘의 운세 타로 마스터 세레나 아스트라입니다. 타로점을 볼 때 주의할 점과 타로점을 보는 방법에 대해 말씀드릴게요. 타로는 단순한 운세를 넘어 개인의 삶을 비추는 도구에요. 모호하거나 추상적인 고민은 해석이 어려울 수도 있어요. 명확한 답을 얻고 싶다면, 당신의 마음에 집중하고 내면을 깊이 탐구하는 시간을 충분히 가지세요. 오늘의 운세는 총 1장의 카드를 뽑습니다. 당신의 마음에 귀 기울여 카드를 뽑고나면, 그 의미를 당신의 상황에 맞게 해석할 거예요. 기억하세요. 해석은 주관적일 수 있으니, 다양한 관점에서 생각해보아야 합니다. 이제 여러분의 이야기를 들려주세요. 함께 깊은 의미를 헤아려 보아요.";
  const setLuckType = useSetRecoilState(selectLuck);
  const [taroMaster, setTaroMaster] = useState("");
  const settarotMasterImg = useSetRecoilState(tarotMasterImg);

  // const로 선언했을 때 불변값이라 값을 변화하면 에러 생김
  const getText = (): void => {
    axios
      .get("/api/v1/tarot/option", {
        params: {
          //await: 비동기 함수 안에서 promise 객체가 처리될 때까지 기다림
          luckType: "오늘의 운세",
          luckOpt: 0,
        },
      })
      .then((res) => {
        setTaroMaster(res.data.data.master_name);
        setLuckType(1);
        settarotMasterImg(TodayFortuneImg);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // 다 적었다는 버튼 클릭 시
  const [writeDone, setWriteDone] = useState(false);

  const textChange = () => {
    setWriteDone(true);
    setComeout(2);
  };
  //한글자씩 나오게 하는 로직
  const [blobTitle2, setBlobTitle2] = useState("");
  const [count2, setCount2] = useState(0);
  const completionWord2 = "자, 그럼 이제 타로의 세계로 떠나볼까요?";

  useEffect(() => {
    if (writeDone) {
      const typingInterval = setInterval(() => {
        setBlobTitle2((prevTitleValue) => {
          if (count2 < completionWord2.length) {
            const newChar = completionWord2[count2];
            const result = prevTitleValue ? prevTitleValue + newChar : newChar;
            setCount2(count2 + 1);
            return result;
          } else {
            clearInterval(typingInterval);
            setTimeout(() => {
              navigate("/cardselect1");
            }, 2000);
            return prevTitleValue;
          }
        });
      }, 30);

      return () => {
        clearInterval(typingInterval);
      };
    }
  });
  const handleNextButton = async () => {
    try {
      const response = await axios.post(
        "/api/v1/polls",
        {},
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      console.log("성공", response.data);
      setPollId(response.data.data.pollId);
      textChange();
    } catch (error) {
      console.log(error);
    }
  };
  const handleReplyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReply(event.target.value);
  };
  //한글자씩 나오게 하는 로직
  const [blobTitle, setBlobTitle] = useState("");
  const [count, setCount] = useState(0);
  const completionWord = tellMeText;
  const [comeout, setComeout] = useState(0);

  useEffect(() => {
    if (comeout === 0) {
      const typingInterval = setInterval(() => {
        setBlobTitle((prevTitleValue) => {
          const result = prevTitleValue
            ? prevTitleValue + completionWord[count]
            : completionWord[0];
          setCount(count + 1);
          if (count >= completionWord.length - 1) {
            setCount(0);
            setComeout(1);
          }
          return result;
        });
      }, 30);
      return () => {
        clearInterval(typingInterval);
      };
    }
  });

  //자동으로 스크롤이 내려가게 하는 로직
  const chatBoxRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    const chatBox = chatBoxRef.current;
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [blobTitle]);

  useEffect(() => {
    getText();
  }, []);
  return (
    <BackgroundColor>
      <Inside>
        <LoadingPage></LoadingPage>
        <Navbar />
        <BackgroundWrapper>
          <Profile src={TodayFortuneImg}></Profile>
          <TitleBox>
            <TitleContent>{taroMaster} 타로 마스터와의 대화</TitleContent>
          </TitleBox>
          <BackgroundImg src={Background} alt="Background" />
          <ChatBox>
            <Tellme ref={chatBoxRef} className="chatBox">
              {blobTitle}
            </Tellme>
          </ChatBox>
          {comeout === 0 ? (
            <></>
          ) : (
            <>
              <ReplyBox>
                <Reply
                  placeholder="이곳에 고민을 적어주세요"
                  value={reply}
                  onChange={handleReplyChange}
                ></Reply>
              </ReplyBox>
              <Profile2 src={TodayFortuneImg}></Profile2>
              {!writeDone ? (
                <NextBox>
                  <NextText onClick={handleNextButton}>다 적었나요?</NextText>
                </NextBox>
              ) : (
                <NextBox2>
                  <NextText2>{blobTitle2}</NextText2>
                </NextBox2>
              )}
            </>
          )}
        </BackgroundWrapper>
      </Inside>
    </BackgroundColor>
  );
};
export default TodayFortune;
