import Navbar from "../component/Navbar";
import styled from "styled-components";
import Background from "../assets/Background.png";
import FriendshipImg from "../assets/Friendship.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
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

const FriendShip = () => {
  const navigate = useNavigate();
  const setPollId = useSetRecoilState(pollIdState);
  const accessToken = useRecoilValue(accessTokenState);
  const [reply, setReply] = useRecoilState(replyState);
  const [tellMeText, setTellMeText] = useState(""); //useState TellMeText를 빈칸으로 선언
  const setLuckType = useSetRecoilState(selectLuck);
  const [taroMaster, setTaroMaster] = useState("");
  const settarotMasterImg = useSetRecoilState(tarotMasterImg);

  // const로 선언했을 때 불변값이라 값을 변화하면 에러 생김
  const getText = (): void => {
    axios
      .get("/api/v1/tarot/option", {
        params: {
          //await: 비동기 함수 안에서 promise 객체가 처리될 때까지 기다림
          luckType: "우정운",
          luckOpt: 0,
        },
      })
      .then((res) => {
        console.log(res.data.data.content);
        setTellMeText(res.data.data.content); //set@=텍스트 값 바꿈
        setTaroMaster(res.data.data.master_name);
        settarotMasterImg(FriendshipImg);
        setLuckType(3);
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
  const completionWord2 = "너의 친구들을 한번 알아보러 가보자꾸나..🔍";

  useEffect(() => {
    console.log(count2, completionWord2.length);
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
              navigate("/cardselect5");
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
          <Profile src={FriendshipImg}></Profile>
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
              <Profile2 src={FriendshipImg}></Profile2>
              {!writeDone ? (
                <NextBox>
                  <NextText onClick={handleNextButton}>
                    다 적었으면 말해주렴.
                  </NextText>
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

export default FriendShip;
